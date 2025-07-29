import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  ManyToOne as ManyToOne_,
  Index as Index_,
  CreateDateColumn as CreateDateColumn_,
  UpdateDateColumn as UpdateDateColumn_,
  JoinColumn as JoinColumn_,
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
  @JoinColumn_({ name: 'user_id' })
  user!: User

  @Column_('text', { name: 'user_id', nullable: true })
  userId!: string

  @Index_()
  @Column_('text', { name: 'asset_address', nullable: true })
  assetAddress!: string

  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: false })
  balance!: string

  @Column_('numeric', { transformer: marshal.floatTransformer, nullable: false })
  points!: number

  @Column_('numeric', {
    name: 'user_points_paid',
    transformer: marshal.floatTransformer,
    nullable: false,
  })
  userPointsPaid!: number

  @Column_('int4', { name: 'last_updated_block', nullable: false })
  lastUpdatedBlock!: number

  @CreateDateColumn_({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date

  @UpdateDateColumn_({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date
}
