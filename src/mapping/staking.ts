import { StoreWithCache } from '@belopash/typeorm-store'
import * as stakingAbi from '../abi/staking'
import { Log } from '../processor'
import { Item, MappingContext } from './common'
import { User } from '../model'

export function getStakingActions(ctx: MappingContext<StoreWithCache>, item: Item) {
  switch (item.kind) {
    case 'log': {
      const log = item.value
      switch (log.topics[0]) {
        case stakingAbi.events.Stake.topic:
          handleStaked(ctx, log)
          break

        case stakingAbi.events.Withdraw.topic:
          handleWithdraw(ctx, log)
          break
      }
      break
    }
  }
}

function handleStaked(ctx: MappingContext<StoreWithCache>, log: Log) {
  const event = stakingAbi.events.Stake.decode(log)

  const amount = event.amount
  const userId = event.user

  const userDeferred = ctx.store.defer(User, userId)

  ctx.queue
    .lazy(async () => {
      const user = await userDeferred.get()
      if (!user) {
        ctx.queue.add('user_create', { address: userId })
      }
    })
    .add('user_stake', {
      logIndex: log.logIndex,
      userId,
      amount,
    })
    .add('user_update_points', {
      userId,
      assetId: 'XCN',
      amount,
    })
}

function handleWithdraw(ctx: MappingContext<StoreWithCache>, log: Log) {
  const event = stakingAbi.events.Withdraw.decode(log)

  const amount = event.amount
  const userId = event.user

  const userDeferred = ctx.store.defer(User, userId)

  ctx.queue
    .lazy(async () => {
      const user = await userDeferred.get()
      if (!user) {
        ctx.queue.add('user_create', { address: userId })
      }
    })
    .add('user_withdraw', {
      logIndex: log.logIndex,
      userId,
      amount,
    })
    .add('user_update_points', {
      userId,
      assetId: 'XCN',
      amount: -amount,
    })
}
