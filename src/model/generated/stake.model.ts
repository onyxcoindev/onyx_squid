import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  ManyToOne as ManyToOne_,
  Index as Index_,
} from 'typeorm'
import { User } from './user.model'
import * as marshal from './marshal'

@Entity_()
export class Stake {
  constructor(props?: Partial<Stake>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_('int4', { nullable: false })
  blockNumber!: number

  @Column_('int4', { nullable: false })
  timestamp!: number

  @Column_('text', { nullable: false })
  txHash!: string

  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: false })
  amount!: bigint

  @Index_()
  @ManyToOne_(() => User, { nullable: true })
  user!: User

  @Column_('text', { nullable: true })
  userId!: string
}
