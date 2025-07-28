import { StoreWithCache, TypeormDatabaseWithCache } from '@belopash/typeorm-store'
import { BlockData, processor } from './processor'
import { ActionQueue } from './action/queue'
import { Item, MappingContext } from './mapping/common'
import { getStakingActions } from './mapping/staking'

processor.run(new TypeormDatabaseWithCache({ supportHotBlocks: true }), async (ctx) => {
  const queue = new ActionQueue({
    _chain: ctx._chain,
    log: ctx.log,
    store: ctx.store,
  })

  for (let block of ctx.blocks) {
    queue.setBlock(block.header)
    const items = orderItems(block)

    for (let item of items) {
      const tx = item.kind === 'log' ? item.value.transaction : item.value
      queue.setTransaction(tx)

      processItem({ ...ctx, queue }, item)
    }
  }

  await queue.process()
  await ctx.store.flush()
})

export function orderItems(block: BlockData) {
  const items: Item[] = []

  for (const transaction of block.transactions) {
    items.push({
      kind: 'transaction',
      address: transaction.to,
      value: transaction,
    })
  }

  for (const log of block.logs) {
    items.push({
      kind: 'log',
      address: log.address,
      value: log,
    })
  }

  items.sort((a, b) => {
    if (a.kind === 'log' && b.kind === 'log') {
      return a.value.logIndex - b.value.logIndex
    } else if (a.kind === 'transaction' && b.kind === 'transaction') {
      return a.value.transactionIndex - b.value.transactionIndex
    } else if (a.kind === 'log' && b.kind === 'transaction') {
      return a.value.transactionIndex - b.value.transactionIndex || 1 // transaction before logs
    } else if (a.kind === 'transaction' && b.kind === 'log') {
      return a.value.transactionIndex - b.value.transactionIndex || -1
    } else {
      throw new Error('Unexpected case')
    }
  })

  return items
}

export function processItem(ctx: MappingContext<StoreWithCache>, item: Item) {
  getStakingActions(ctx, item)
}
