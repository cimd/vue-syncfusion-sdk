import { describe, expect, it } from 'vitest'
import ScheduleGantt from '../../mocks/ScheduleGantt.js'


describe('Gantt', () => {
  it('creates', async () => {
    const grid = new ScheduleGantt()

    expect(grid).toBeInstanceOf(ScheduleGantt)
  })
})
