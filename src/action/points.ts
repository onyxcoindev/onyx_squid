import { LessThanOrEqual } from 'typeorm'
import { Asset, UserBalance } from '../model'
import { Action } from './base'
import { BigDecimal } from '@subsquid/big-decimal'
import { POINTS_CALCULATED_AT_BLOCK, XCN_ADDRESS, XCN_DECIMALS } from '../config'

const POINTS_RATE = 5_000_000

export interface PointsActionData {
  userId: string
  assetId: string
  amount: bigint
}

export class PointsAction extends Action<PointsActionData> {
  async perform() {
    if (this.block.height < POINTS_CALCULATED_AT_BLOCK) {
      return
    }

    const [asset, userBalance] = await Promise.all([
      this.findLatestAsset(this.block.height),
      this.findLatestUserBalance(this.block.height),
    ])

    this.notifyPoints(asset, POINTS_RATE, this.block.height)
    await this.setBalance(userBalance, asset, this.data.amount)

    this.log.debug(`Updated points for user ${this.data.userId}`)
  }

  private async findLatestAsset(block: number) {
    let asset = await this.store.findOne(Asset, {
      where: { lastUpdatedBlock: LessThanOrEqual(block) },
      order: { lastUpdatedBlock: 'DESC' },
    })

    if (!asset || asset.lastUpdatedBlock !== block) {
      asset = new Asset({
        id: `${this.data.assetId}-${block}`,
        totalSupply: asset?.totalSupply ?? '0',
        pointsPerToken: asset?.pointsPerToken ?? 0,
        symbol: XCN_ADDRESS,
        decimals: asset?.decimals ?? XCN_DECIMALS,
        lastUpdatedBlock: asset?.lastUpdatedBlock ?? block,
      })
    }

    return asset
  }

  private async findLatestUserBalance(block: number) {
    let userBalance = await this.store.findOne(UserBalance, {
      where: {
        userId: this.data.userId,
        assetAddress: this.data.assetId,
        lastUpdatedBlock: LessThanOrEqual(block),
      },
      order: { lastUpdatedBlock: 'DESC' },
    })

    if (!userBalance || userBalance.lastUpdatedBlock !== block) {
      userBalance = new UserBalance({
        id: `${this.data.userId}-${this.data.assetId}-${block}`,
        userId: this.data.userId,
        assetAddress: this.data.assetId,
        balance: userBalance?.balance ?? '0',
        points: userBalance?.points ?? 0,
        userPointsPaid: userBalance?.userPointsPaid ?? 0,
        lastUpdatedBlock: userBalance?.lastUpdatedBlock ?? block,
      })
    }

    return userBalance
  }

  private notifyPoints(asset: Asset, pointsRate: number, currentBlock: number) {
    const totalSupplyBN = BigDecimal(asset.totalSupply, asset.decimals)
    if (totalSupplyBN.eq(0)) return

    const deltaBlocks = currentBlock - asset.lastUpdatedBlock
    const additionalPoints = BigDecimal(pointsRate).times(deltaBlocks).div(totalSupplyBN)

    asset.pointsPerToken = BigDecimal(asset.pointsPerToken).plus(additionalPoints).toNumber()
    asset.lastUpdatedBlock = currentBlock
  }

  private async setBalance(user: UserBalance, asset: Asset, amount: bigint) {
    const userBalanceBN = BigDecimal(user.balance)

    const delta = BigDecimal(asset.pointsPerToken).minus(user.userPointsPaid)
    const earned = BigDecimal(userBalanceBN, asset.decimals).times(delta)

    user.points = BigDecimal(user.points).plus(earned).toNumber()
    user.userPointsPaid = asset.pointsPerToken

    const nextBalance = userBalanceBN.plus(amount)
    user.balance = nextBalance.gte(0) ? nextBalance.toString() : '0'
    user.lastUpdatedBlock = asset.lastUpdatedBlock

    await this.store.upsert(user)

    const newTotalSupply = BigDecimal(asset.totalSupply).plus(amount)
    asset.totalSupply = newTotalSupply.gte(0) ? newTotalSupply.toString() : '0'

    await this.store.upsert(asset)
  }
}
