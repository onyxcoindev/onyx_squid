import 'reflect-metadata'
import { Arg, Int, Query, Resolver } from 'type-graphql'
import { FindManyOptions, type EntityManager } from 'typeorm'

import {
  LeaderboardEntity,
  LeaderboardOrderByType,
  OrderDirectionType,
} from '../models/leaderboard'
import { User } from '../../model'
import { pagination } from '../utils'

@Resolver()
export class LeaderboardResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => LeaderboardEntity)
  async leaderboard(
    @Arg('limit', () => Int, { nullable: true }) limit: number,
    @Arg('offset', () => Int, { nullable: true }) offset: number,
    @Arg('orderBy', () => LeaderboardOrderByType, { nullable: true })
    orderBy: LeaderboardOrderByType
  ): Promise<LeaderboardEntity> {
    const manager = await this.tx()
    const userRepo = manager.getRepository(User)

    const orderSplit = orderBy?.split('_')
    const orderField = orderSplit?.[0] as keyof User
    const orderDirection = orderSplit?.[1] as OrderDirectionType

    const condition: FindManyOptions<User> = {
      select: ['id', 'points'],
    }

    if (orderField) {
      condition.order = { [orderField]: orderDirection }
    }
    if (limit) {
      condition.take = limit
    }
    if (offset) {
      condition.skip = offset
    }

    const [results, totalCount] = await userRepo.findAndCount(condition)

    return {
      results,
      meta: pagination(limit, offset, totalCount),
    }
  }
}
