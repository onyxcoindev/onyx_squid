import _ from 'lodash'
import moment from 'moment'
import { ObjectLiteral } from 'typeorm'

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

export function mergeArrayOfObjectsByKey<E extends ObjectLiteral>(arr: E[], key: keyof E) {
  // Create an empty object to store the merged objects
  const mergedObj = {} as Record<string, E>

  // Iterate over each object in the array
  arr.forEach((obj) => {
    // Extract the value of the specified key
    const keyValue = obj[key]

    // Merge the current object into the merged object based on the key value
    mergedObj[keyValue] = _.merge(mergedObj[keyValue], obj)
  })

  // Convert the merged object back to an array
  const mergedArr = Object.values(mergedObj)

  return mergedArr
}

export function pagination(limit: number, offset: number, total: number) {
  let page = 1
  let totalPages = 1

  if (limit) {
    page = parseInt(String((offset ?? 0) / limit), 10) + 1
    totalPages = Math.ceil(total / limit)
  }

  return { page, limit: limit ?? total, totalPages, total }
}
