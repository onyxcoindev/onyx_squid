import { cronUserPoints } from './server-extension/cronjob'
import { CronJob, database } from './server-extension/helper'

const cronProcess = async () => {
  try {
    const dataSource = await database.initialize()
    const manager = dataSource.manager

    const cronjob = new CronJob()
    cronjob.addJob(cronUserPoints(manager))
    cronjob.run()
  } catch (error) {
    console.error(error)
  }
}

cronProcess()
