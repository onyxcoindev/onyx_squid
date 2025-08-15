import { User } from '../model'
import { Action } from './base'

export interface CreateUserActionData {
  address: string
}

export class CreateUserAction extends Action<CreateUserActionData> {
  async perform() {
    const user = new User({
      id: this.data.address,
      points: '0',
      ethPoints: '0',
      onyxPoints: '0',
      balance: 0n,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await this.store.insert(user)

    this.log.debug(`User ${user.id} created`)
  }
}
