import { StoreWithCache } from '@belopash/typeorm-store'
import { Chain } from '@subsquid/evm-processor/lib/interfaces/chain'
import { Logger } from '@subsquid/logger'
import { withErrorContext } from '@subsquid/util-internal'
import assert from 'assert'
import {
  Action,
  ActionBlock,
  ActionConfig,
  ActionConstructor,
  ActionTransaction,
  BaseActionRegistry,
} from './base'
import { CreateUserAction, UpdateUserAction } from './user'
import { StakeAction, WithdrawAction } from './staking'
import { PointsAction } from './points'

const Actions = {
  user_create: CreateUserAction,
  user_update: UpdateUserAction,
  user_stake: StakeAction,
  user_withdraw: WithdrawAction,
  user_update_points: PointsAction,
} satisfies BaseActionRegistry

type ActionRegistry = typeof Actions

export class ActionQueue {
  private actions: Action<any>[] = []

  private block: ActionBlock | undefined
  private transaction: ActionTransaction | undefined

  constructor(private config: { _chain: Chain; store: StoreWithCache; log: Logger }) {}

  get size() {
    return this.actions.length
  }

  setBlock(block: ActionBlock) {
    this.block = block

    return this
  }

  setTransaction(transaction: ActionTransaction | undefined) {
    this.transaction = transaction

    return this
  }

  add<A extends keyof ActionRegistry>(
    action: A,
    data: ActionRegistry[A] extends ActionConstructor<infer R> ? R : never
  ): this {
    assert(this.block != null)

    const ActionConstructor = Actions[action] as ActionConstructor<typeof data>
    if (ActionConstructor == null) {
      throw new Error(`Action '${action}' is not registered.`)
    }

    const a = new ActionConstructor(
      {
        ...this.config,
        block: this.block,
        transaction: this.transaction,
      },
      data
    )
    this.actions.push(a)

    return this
  }

  lazy(cb: () => void | PromiseLike<void>) {
    assert(this.block != null)

    const a = new LazyAction(
      {
        ...this.config,
        block: this.block,
        transaction: this.transaction,
      },
      cb
    )
    this.actions.push(a)

    return this
  }

  async process() {
    await this.processActions(this.actions)
    this.actions = []
  }

  private async processActions(actions: Action<any>[]) {
    for (const action of actions) {
      await this.processAction(action).catch(
        withErrorContext({
          block: action.block.height,
          extrinsicHash: action.transaction?.hash,
        })
      )
    }
  }

  private async processAction(action: Action<any>) {
    if (action instanceof LazyAction) {
      await this.processLazyAction(action)
    } else {
      await action.perform()
    }
  }

  private async processLazyAction(action: LazyAction) {
    const saved = { block: this.block, transaction: this.transaction, actions: this.actions }
    try {
      this.block = action.block
      this.transaction = action.transaction
      this.actions = []
      await action.perform()
      await this.processActions(this.actions)
    } finally {
      this.block = saved.block
      this.transaction = saved.transaction
      this.actions = saved.actions
    }
  }
}

class LazyAction extends Action<unknown> {
  constructor(protected config: ActionConfig, readonly cb: () => void | PromiseLike<void>) {
    super(config, {})
  }

  async perform(): Promise<void> {
    await this.cb()
  }
}
