import { DataHandlerContext } from '@subsquid/evm-processor'
import { Log, Transaction } from '../processor'
import { ActionQueue } from '../action/queue'

export type Item =
  | {
      kind: 'log'
      address: string
      value: Log
    }
  | {
      kind: 'transaction'
      address: string | undefined
      value: Transaction
    }

export type MappingContext<Store> = Omit<DataHandlerContext<Store, {}>, 'blocks'> & {
  queue: ActionQueue
}
