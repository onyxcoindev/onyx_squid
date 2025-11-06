import assert from 'assert'
import { Stake, Stats, User, Withdraw } from '../model'
import { Action } from './base'

export interface StakeActionData {
  logIndex: number
  userId: string
  amount: bigint
}

export class StakeAction extends Action<StakeActionData> {
  async perform() {
    const stake = new Stake({
      id: this.transaction?.id + '-' + this.data.logIndex,
      userId: this.data.userId,
      amount: this.data.amount,
      blockNumber: this.block.height,
      timestamp: this.block.timestamp / 1000,
      txHash: this.transaction?.hash,
    })

    await Promise.all([
      this.store.insert(stake),
      this.updateUserBalance(this.data.userId),
      this.updateStats(),
    ])

    this.log.debug(`User ${this.data.userId} staked ${this.data.amount}`)
  }

  private async updateUserBalance(userId: string) {
    const user = await this.store.getOrFail(User, userId)
    assert(user !== null)

    if (!user.balance) user.balance = 0n

    user.balance += this.data.amount
    user.balanceUpdatedAtBlock = this.block.height

    await this.store.upsert(user)
  }

  private async updateStats() {
    let stats = await this.store.findOne(Stats, { where: {} })
    if (!stats) {
      stats = new Stats({
        id: '1',
        totalStaked: this.data.amount,
        lastUpdatedBlock: this.block.height,
      })
    } else {
      stats.totalStaked += this.data.amount
      stats.lastUpdatedBlock = this.block.height
    }

    await this.store.upsert(stats)
  }
}

export interface WithdrawActionData {
  logIndex: number
  userId: string
  amount: bigint
}

export class WithdrawAction extends Action<WithdrawActionData> {
  async perform() {
    const withdraw = new Withdraw({
      id: this.transaction?.id + '-' + this.data.logIndex,
      userId: this.data.userId,
      amount: this.data.amount,
      blockNumber: this.block.height,
      timestamp: this.block.timestamp / 1000,
      txHash: this.transaction?.hash,
    })

    await Promise.all([
      this.store.insert(withdraw),
      this.updateUserBalance(this.data.userId),
      this.updateStats(),
    ])

    this.log.debug(`User ${this.data.userId} withdrew ${this.data.amount}`)
  }

  private async updateUserBalance(userId: string) {
    const user = await this.store.getOrFail(User, userId)
    assert(user !== null)

    user.balance -= this.data.amount
    user.balanceUpdatedAtBlock = this.block.height

    await this.store.upsert(user)
  }

  private async updateStats() {
    let stats = await this.store.findOne(Stats, { where: {} })
    if (!stats) {
      stats = new Stats({
        id: '1',
        totalStaked: 0n,
        lastUpdatedBlock: this.block.height,
      })
    } else {
      stats.totalStaked -= this.data.amount
      stats.lastUpdatedBlock = this.block.height
    }

    await this.store.upsert(stats)
  }
}
