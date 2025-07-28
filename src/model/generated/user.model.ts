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

  @Column_('numeric', { transformer: marshal.floatTransformer, nullable: false })
  points!: number

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
