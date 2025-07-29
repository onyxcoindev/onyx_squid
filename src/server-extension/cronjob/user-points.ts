import cron from 'node-cron'
import _ from 'lodash'
import { EntityManager, LessThanOrEqual } from 'typeorm'
import { formatServiceName, wrapPromiseFunction, cronExpression, ZERO_BN } from '../utils'
import { BigDecimal } from '@subsquid/big-decimal'
import { POINTS_CALCULATED_AT_BLOCK, XCN_ADDRESS, XCN_POINTS_RATE } from '../../config'
import { Asset, User } from '../../model'

interface IUserBalance {
  user_id: string
  asset_address: string
  balance: string | number
  points: string | number
  user_points_paid: string | number
  last_updated_block: number
}

export const cronUserPoints = async (manager: EntityManager) => {
  let passed = true
  const funcName = formatServiceName(cronUserPoints.name)

  const task = cron.schedule(cronExpression.every60Seconds, async () => {
    if (passed) {
      passed = false
      await wrapPromiseFunction(handleUserPoints, funcName)(manager)
      passed = true
    }
  })

  task.start()
}

const handleUserPoints = async (manager: EntityManager) => {
  const assetRepo = manager.getRepository(Asset)
  const userRepo = manager.getRepository(User)

  const currentBlock = await getCurrentBlock(manager)

  const asset = await assetRepo.findOne({
    where: { lastUpdatedBlock: LessThanOrEqual(currentBlock) },
    order: { lastUpdatedBlock: 'DESC' },
  })
  if (!asset) return {}

  const additionalPoints = calculateAdditionalPoints(asset, currentBlock)
  const usersBalance = await getUsersBalanceAtBlock(manager, currentBlock, XCN_ADDRESS)

  const usersEarned = usersBalance.reduce((acc: { [x: string]: string }, user: IUserBalance) => {
    const pointsEarned = pointsPerAsset(user, asset, additionalPoints)
    acc[user.user_id] = acc[user.user_id] || '0'
    acc[user.user_id] = BigDecimal(acc[user.user_id]).plus(pointsEarned).toString()
    return acc
  }, {})

  const records = Object.entries(usersEarned).map(([id, points]: any) => ({ id, points }))
  const chunks = _.chunk(records, 100)
  for (const chunk of chunks) {
    await userRepo.upsert(chunk, {
      conflictPaths: ['id'],
      skipUpdateIfNoValuesChanged: true,
    })
  }
}

const getCurrentBlock = async (manager: EntityManager) => {
  const currentBlock = await manager.query(`SELECT height FROM squid_processor.status`)
  return currentBlock?.[0]?.height ?? POINTS_CALCULATED_AT_BLOCK
}

const calculateAdditionalPoints = (asset: Asset, currentBlock: number) => {
  const totalSupplyBN = BigDecimal(asset.totalSupply, asset.decimals)
  const pointsRate = XCN_POINTS_RATE

  const deltaBlocks = currentBlock - asset.lastUpdatedBlock
  const additionalPoints = totalSupplyBN.gt(0)
    ? BigDecimal(pointsRate).times(deltaBlocks).div(totalSupplyBN)
    : ZERO_BN

  return additionalPoints
}

const getUsersBalanceAtBlock = async (manager: EntityManager, block: number, asset: string) => {
  const rawQuery = `--sql
    SELECT DISTINCT ON (user_id, asset_address) *
    FROM user_balance
    WHERE last_updated_block <= ${block} AND asset_address = '${asset}'
    ORDER BY user_id, asset_address, last_updated_block DESC
  `
  return manager.query(rawQuery)
}

const pointsPerAsset = (user: IUserBalance, asset: Asset, additionalPoints: BigDecimal) => {
  const pointsPerToken = BigDecimal(asset.pointsPerToken).plus(additionalPoints).toString()

  const delta = BigDecimal(pointsPerToken).minus(user.user_points_paid)
  const earned = BigDecimal(user.balance, asset.decimals).times(delta)

  return earned.plus(user.points)
}
