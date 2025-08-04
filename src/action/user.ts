import { User } from '../model'
import { Action } from './base'

export interface CreateUserActionData {
  address: string
}

export class CreateUserAction extends Action<CreateUserActionData> {
  async perform() {
    const user = new User({
      id: this.data.address,
      points: 0,
      balance: 0n,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await this.store.insert(user)

    this.log.debug(`User ${user.id} created`)
  }
}

export interface UpdateUserActionData {
  userId: string
  points: number
}

export class UpdateUserAction extends Action<UpdateUserActionData> {
  async perform() {
    const user = await this.store.getOrFail(User, this.data.userId)

    user.points = this.data.points
    await this.store.upsert(user)

    this.log.debug(`Points of user ${user.id} updated to ${user.points}`)
  }
}

export interface SwapUserActionData {
  userId: string
  amount0: bigint
  amount1: bigint
  poolId: string
  usdTokenId: string
}
