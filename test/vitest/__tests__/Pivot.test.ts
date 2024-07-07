import { describe, expect, it } from 'vitest'
import { Pivot } from '../../../src/index.ts'
import PostsPivot from '../../mocks/PostsPivot.js'


describe('Pivot', () => {
  it('creates', async () => {
    const pivot = new PostsPivot()

    expect(pivot).toBeInstanceOf(Pivot)
  })
})
