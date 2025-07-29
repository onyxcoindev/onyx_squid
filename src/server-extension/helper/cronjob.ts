import { formatTime } from '../utils'

type Job = void | Promise<void>

export class CronJob {
  private jobs: Job[] = []

  public addJob(job: Job) {
    this.jobs.push(job)
  }

  public run() {
    try {
      console.log(`${formatTime()}: Cron Job has been started`)
      Promise.all(this.jobs)
    } catch (error) {
      console.error('Cron run fail', error)
    }
  }
}
