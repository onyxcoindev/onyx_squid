import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  CreateDateColumn as CreateDateColumn_,
  UpdateDateColumn as UpdateDateColumn_,
} from 'typeorm'
import * as marshal from './marshal'

@Entity_()
export class PointSetting {
  constructor(props?: Partial<PointSetting>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_('numeric', {
    name: 'points_per_day',
    transformer: marshal.floatTransformer,
    nullable: true,
    default: 0,
  })
  pointsPerDay!: number

  @Column_('numeric', {
    name: 'eth_weight',
    transformer: marshal.floatTransformer,
    nullable: true,
    default: 0,
  })
  ethWeight!: number

  @Column_('numeric', {
    name: 'onyx_weight',
    transformer: marshal.floatTransformer,
    nullable: true,
    default: 0,
  })
  onyxWeight!: number

  @Column_('int4', { name: 'eth_start_block', nullable: true })
  ethStartBlock!: number

  @Column_('int4', { name: 'onyx_start_block', nullable: true })
  onyxStartBlock!: number

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
