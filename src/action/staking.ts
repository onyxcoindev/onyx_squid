import { Stake, Withdraw } from '../model'
import { Action } from './base'

export interface StakeActionData {
  userId: string
  amount: bigint
}

export class StakeAction extends Action<StakeActionData> {
  async perform() {
    const stake = new Stake({
      id: this.transaction?.id,
      userId: this.data.userId,
      amount: this.data.amount,
      blockNumber: this.block.height,
      timestamp: this.block.timestamp / 1000,
      txHash: this.transaction?.hash,
    })

    await this.store.insert(stake)

    this.log.debug(`User ${this.data.userId} staked ${this.data.amount}`)
  }
}

export interface WithdrawActionData {
  userId: string
  amount: bigint
}

export class WithdrawAction extends Action<WithdrawActionData> {
  async perform() {
    const withdraw = new Withdraw({
      id: this.transaction?.id,
      userId: this.data.userId,
      amount: this.data.amount,
      blockNumber: this.block.height,
      timestamp: this.block.timestamp / 1000,
      txHash: this.transaction?.hash,
    })

    await this.store.insert(withdraw)

    this.log.debug(`User ${this.data.userId} withdrew ${this.data.amount}`)
  }
}
