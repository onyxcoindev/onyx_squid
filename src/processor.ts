import {
  BlockHeader as _BlockHeader,
  BlockData as _BlockData,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
  assertNotNull,
} from '@subsquid/evm-processor'
import * as stakingAbi from './abi/staking'
import { FINALITY_CONFIRMATION, ETH_GATEWAY_ENDPOINT, STAKING_ADDRESS } from './config'

export const processor = new EvmBatchProcessor()
  .setBlockRange({ from: 14_484_683 })
  .setGateway(ETH_GATEWAY_ENDPOINT)
  .setRpcEndpoint({
    url: assertNotNull(process.env.RPC_ETH_HTTP, 'Required env variable RPC_ETH_HTTP is missing'),
    maxBatchCallSize: 10,
  })
  .setFinalityConfirmation(FINALITY_CONFIRMATION)
  .setFields({
    log: {
      topics: true,
      data: true,
    },
    transaction: {
      from: true,
      hash: true,
      sighash: true,
      status: true,
      input: true,
    },
  })
  .addLog({
    address: [STAKING_ADDRESS],
    topic0: [
      stakingAbi.events.Stake.topic,
      stakingAbi.events.Withdraw.topic,
      stakingAbi.events.EmergencyWithdraw.topic,
    ],
    transaction: true,
  })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type BlockData = _BlockData<Fields>
export type Block = _BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
