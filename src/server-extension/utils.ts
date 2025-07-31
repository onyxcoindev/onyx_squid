import { BigDecimal } from '@subsquid/big-decimal'
import moment from 'moment'

export function formatServiceName(str: string) {
  if (!str) return 'null'
  return str.replace(str[0], str[0].toUpperCase())
}

export function formatTime(time?: moment.Moment) {
  const currentTime = time ?? moment()
  return currentTime.format('DD-MM-YYYY H:mm:ss')
}

export function wrapPromiseFunction<T, A extends any[]>(
  fn: (...args: A) => Promise<T>,
  funcName?: string,
  logging = true
): (...args: A) => Promise<T | void> {
  return async function (...args: A): Promise<T | void> {
    const start = Date.now()
    const nameService = funcName || formatServiceName(fn.name)

    try {
      const result = await fn(...args)

      const timeExec = ((Date.now() - start) / 1000).toFixed(3)
      if (logging) console.log(`${formatTime()}: [${nameService}] - ${timeExec}s - SUCCESS`)

      return result
    } catch (error) {
      const timeExec = ((Date.now() - start) / 1000).toFixed(3)
      console.error(`${formatTime()}: [${nameService}] - ${timeExec}s - FAILED`, error)
    }
  }
}

export const ZERO_BI = BigInt(0)
export const ZERO_BN = BigDecimal(0)

export const cronExpression = {
  every10Seconds: '*/10 * * * * *',
  every15Seconds: '*/15 * * * * *',
  every30Seconds: '0,30 * * * * *',
  every60Seconds: '0 * * * * *',
}
