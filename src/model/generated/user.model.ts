import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  CreateDateColumn as CreateDateColumn_,
  UpdateDateColumn as UpdateDateColumn_,
} from 'typeorm'
import * as marshal from './marshal'

@Entity_()
export class User {
  constructor(props?: Partial<User>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_('numeric', {
    name: 'eth_points',
    transformer: marshal.floatTransformer,
    nullable: true,
    default: 0,
  })
  ethPoints!: string

  @Column_('numeric', {
    name: 'onyx_points',
    transformer: marshal.floatTransformer,
    nullable: true,
    default: 0,
  })
  onyxPoints!: string

  @Column_('numeric', { transformer: marshal.floatTransformer, nullable: false })
  points!: string

  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: true })
  balance!: bigint

  @Column_('int4', { name: 'balance_updated_at_block', nullable: true })
  lastUpdatedAtBlock!: number

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
