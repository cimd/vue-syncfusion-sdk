import type Schedule from './datasets/ScheduleInterface.js'
import { Gantt } from '@/index.ts'

export default class ScheduleGantt extends Gantt<Schedule> {

  constructor() {
    super({ id: 'gantt', stateVersion: 0 })
  }
}
