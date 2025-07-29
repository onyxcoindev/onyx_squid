import { DataSource } from 'typeorm'
import { Asset, Stake, User, UserBalance, Withdraw } from '../../model'
import { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } from '../../config'

const entities = [Asset, UserBalance, User, Stake, Withdraw]

export const database = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities,
  synchronize: false,
})
