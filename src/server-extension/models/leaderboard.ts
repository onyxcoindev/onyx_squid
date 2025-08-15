import { Field, ObjectType, registerEnumType } from 'type-graphql'

@ObjectType()
export class MetadataEntity {
  @Field(() => Number, { nullable: false })
  totalPages!: number

  @Field(() => Number, { nullable: false })
  page!: number

  @Field(() => Number, { nullable: false })
  limit!: number

  @Field(() => Number, { nullable: false })
  total!: number

  constructor(props: Partial<MetadataEntity>) {
    Object.assign(this, props)
  }
}

@ObjectType()
export class LeaderboardItemEntity {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: false })
  points!: string

  constructor(props: Partial<LeaderboardItemEntity>) {
    Object.assign(this, props)
  }
}

@ObjectType()
export class LeaderboardEntity {
  @Field(() => [LeaderboardItemEntity], { nullable: false })
  results!: LeaderboardItemEntity[]

  @Field(() => MetadataEntity, { nullable: false })
  meta!: MetadataEntity

  constructor(props: Partial<LeaderboardEntity>) {
    Object.assign(this, props)
  }
}

export enum LeaderboardOrderByType {
  points_DESC = 'points_DESC',
  points_ASC = 'points_ASC',
  id_DESC = 'id_DESC',
  id_ASC = 'id_ASC',
}

registerEnumType(LeaderboardOrderByType, {
  name: 'LeaderboardOrderByType',
  description: 'The type of Leaderboard Order',
})

export enum OrderDirectionType {
  ASC = 'ASC',
  DESC = 'DESC',
}
