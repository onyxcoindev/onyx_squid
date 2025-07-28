import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  ManyToOne as ManyToOne_,
  Index as Index_,
  CreateDateColumn as CreateDateColumn_,
  UpdateDateColumn as UpdateDateColumn_,
} from 'typeorm'
import { User } from './user.model'
import { Asset } from './asset.model'
import * as marshal from './marshal'

@Entity_()
export class UserBalance {
  constructor(props?: Partial<UserBalance>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => User, { nullable: true })
  user!: User

  @Column_('text', { nullable: true })
  userId!: string

  @Index_()
  @Column_('text', { nullable: true })
  assetAddress!: string

  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: false })
  balance!: string

  @Column_('numeric', { transformer: marshal.floatTransformer, nullable: false })
  points!: number

  @Column_('numeric', { transformer: marshal.floatTransformer, nullable: false })
  userPointsPaid!: number

  @Column_('int4', { nullable: false })
  lastUpdatedBlock!: number

  @CreateDateColumn_({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date

  @UpdateDateColumn_({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date
}
