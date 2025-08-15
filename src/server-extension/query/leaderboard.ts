import { OrderDirectionType } from '../models/leaderboard'

interface LeaderboardQueryParams {
  orderField: string
  orderDirection: OrderDirectionType
  limit: number
  offset: number
}

export const userPointsLeaderboardQuery = ({
  orderField,
  orderDirection,
  limit,
  offset,
}: Partial<LeaderboardQueryParams>): string => {
  let queryString = `SELECT id, points FROM user`

  if (orderField) {
    queryString += ` ORDER BY ${orderField} ${orderDirection || 'ASC'}`
  }

  if (limit) {
    queryString += ` LIMIT ${limit}`
  }

  if (offset) {
    queryString += ` OFFSET ${offset}`
  }

  return queryString
}
