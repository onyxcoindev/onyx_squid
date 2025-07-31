export const DB_NAME = process.env.DB_NAME || 'onyx-squid'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = process.env.DB_PORT || 23798
export const DB_USER = process.env.DB_USER || 'postgres'
export const DB_PASS = process.env.DB_PASS || 'postgres'

export const STAKING_ADDRESS = '0x23445c63FeEf8D85956dc0f19aDe87606D0e19A9'

export const XCN_ADDRESS = 'XCN'
export const XCN_DECIMALS = 18

export const BLOCKS_PER_DAY = 7200 // (Estimated 1 block per 12 seconds on Ethereum Mainnet)
export const POINTS_PER_DAY = parseInt(process.env.POINTS_PER_DAY || '5000000', 10) // (5M points per day)
export const POINTS_CALCULATED_AT_BLOCK = parseInt(
  process.env.POINTS_CALCULATED_AT_BLOCK || '22917674',
  10
) // (Block number when points were calculated)

export const RPC_ETH_HTTP = process.env.RPC_ETH_HTTP || 'https://ethereum-rpc.publicnode.com'
export const ETH_GATEWAY_ENDPOINT = 'https://v2.archive.subsquid.io/network/ethereum-mainnet'
export const FINALITY_CONFIRMATION = 75
