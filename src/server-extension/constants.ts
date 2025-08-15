import { BigDecimal } from '@subsquid/big-decimal'

export const ZERO_BI = BigInt(0)
export const ZERO_BN = BigDecimal(0)

export const cronExpression = {
  every10Seconds: '*/10 * * * * *',
  every15Seconds: '*/15 * * * * *',
  every30Seconds: '0,30 * * * * *',
  every60Seconds: '0 * * * * *',
}
