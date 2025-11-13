import axios from 'axios'
import cron from 'node-cron'
import _ from 'lodash'
import { EntityManager, LessThanOrEqual } from 'typeorm'
import { BigDecimal } from '@subsquid/big-decimal'
import { formatServiceName, mergeArrayOfObjectsByKey, wrapPromiseFunction } from '../utils'
import { ETH_BLOCKS_PER_DAY, ONYX_POINTS_API_ENDPOINT, XCN_ADDRESS } from '../../config'
import { Asset, PointSetting, User } from '../../model'
import { cronExpression, ZERO_BN } from '../constants'

interface IUserBalance {
  user_id: string
  asset_address: string
  balance: string | number
  points: string | number
  user_points_paid: string | number
  last_updated_block: number
}

interface IUserEarned {
  [id: string]: string
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

  const [additionalPoints, usersBalance, usersPointsOnOnyx] = await Promise.all([
    calculateAdditionalPoints(asset, currentBlock, manager),
    getUsersBalanceAtBlock(manager, currentBlock, XCN_ADDRESS),
    getUsersPointsOnOnyx(),
  ])

  const usersEarned: IUserEarned = usersBalance.reduce((acc: IUserEarned, user: IUserBalance) => {
    const pointsEarned = pointsPerAsset(user, asset, additionalPoints)
    acc[user.user_id] = acc[user.user_id] || '0'
    acc[user.user_id] = BigDecimal(acc[user.user_id]).plus(pointsEarned).toString()
    return acc
  }, {})
  const usersPointsOnEth = Object.entries(usersEarned).map(([id, ethPoints]) => ({ id, ethPoints }))
  const usersPoints = mergeArrayOfObjectsByKey([...usersPointsOnEth, ...usersPointsOnOnyx], 'id')

  const records = usersPoints.map((user) => ({
    id: user.id,
    ethPoints: user.ethPoints ?? '0',
    onyxPoints: user.onyxPoints ?? '0',
    points: BigDecimal(user.ethPoints ?? '0')
      .plus(user.onyxPoints ?? '0')
      .toString(),
  }))

  const chunks = _.chunk(records, 100)
  for (const chunk of chunks) {
    await userRepo.upsert(chunk, {
      conflictPaths: ['id'],
      skipUpdateIfNoValuesChanged: true,
    })
  }
}

const getUsersPointsOnOnyx = async () => {
  let page = 1
  let passed = false

  const results = []
  while (!passed) {
    const res = await axios.get(`${ONYX_POINTS_API_ENDPOINT}/passive-points/leaderboard`, {
      params: { page, limit: 300 },
    })
    const users = (res.data.data.results ?? []).map((user: { id: string; points: string }) => ({
      id: user.id,
      onyxPoints: user.points,
    }))
    results.push(...users)

    passed = users.length < 300
    page++
  }

  return results
}

const getCurrentBlock = async (manager: EntityManager) => {
  const currentBlock = await manager.query(`SELECT height FROM squid_processor.status`)
  return currentBlock?.[0]?.height ?? 0
}

const calculateAdditionalPoints = async (
  asset: Asset,
  currentBlock: number,
  manager: EntityManager
) => {
  const pointSettingRepo = manager.getRepository(PointSetting)
  const pointSetting = await pointSettingRepo.findOne({
    where: { ethStartBlock: LessThanOrEqual(currentBlock) },
    order: { ethStartBlock: 'DESC' },
  })
  if (!pointSetting || !pointSetting.ethStartBlock) return ZERO_BN

  const totalSupplyBN = BigDecimal(asset.totalSupply, asset.decimals)
  const pointsPerDay = (pointSetting.pointsPerDay ?? 0) * (pointSetting.ethWeight ?? 0)
  const pointsRate = pointsPerDay / ETH_BLOCKS_PER_DAY

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
  const pointsPerToken = BigDecimal(asset.pointsPerToken).plus(additionalPoints)

  const delta = pointsPerToken.minus(user.user_points_paid)
  const earned = BigDecimal(user.balance, asset.decimals).times(delta)

  return earned.plus(user.points)
}
