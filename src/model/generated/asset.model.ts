import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  CreateDateColumn as CreateDateColumn_,
  UpdateDateColumn as UpdateDateColumn_,
} from 'typeorm'
import * as marshal from './marshal'

@Entity_()
export class Asset {
  constructor(props?: Partial<Asset>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_('text', { nullable: false })
  symbol!: string

  @Column_('int4', { nullable: false })
  decimals!: number

  @Column_('numeric', { nullable: false })
  totalSupply!: string

  @Column_('int4', { nullable: false })
  lastUpdatedBlock!: number

  @Column_('numeric', { transformer: marshal.floatTransformer, nullable: false })
  pointsPerToken!: number

  @CreateDateColumn_({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  createdAt!: Date

  @UpdateDateColumn_({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date
}
