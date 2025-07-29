import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  ManyToOne as ManyToOne_,
  Index as Index_,
  JoinColumn as JoinColumn_,
} from 'typeorm'
import { User } from './user.model'
import * as marshal from './marshal'

@Entity_()
export class Withdraw {
  constructor(props?: Partial<Withdraw>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_('int4', { name: 'block_number', nullable: false })
  blockNumber!: number

  @Column_('int4', { nullable: false })
  timestamp!: number

  @Column_('text', { name: 'tx_hash', nullable: false })
  txHash!: string

  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: false })
  amount!: bigint

  @Index_()
  @ManyToOne_(() => User, { nullable: true })
  @JoinColumn_({ name: 'user_id' })
  user!: User

  @Column_('text', { name: 'user_id', nullable: true })
  userId!: string
}
