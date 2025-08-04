import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  CreateDateColumn as CreateDateColumn_,
  UpdateDateColumn as UpdateDateColumn_,
} from 'typeorm'
import * as marshal from './marshal'

@Entity_()
export class Stats {
  constructor(props?: Partial<Stats>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_('numeric', {
    name: 'total_staked',
    transformer: marshal.bigintTransformer,
    nullable: false,
  })
  totalStaked!: bigint

  @Column_('int4', { name: 'last_updated_block', nullable: false })
  lastUpdatedBlock!: number

  @CreateDateColumn_({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
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
