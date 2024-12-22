import { describe, expect, it } from 'vitest'
import { Pivot } from '@/index'
import PostsPivot from '../../mocks/PostsPivot.js'


describe('Pivot', () => {
  it('creates', async () => {
    const pivot = new PostsPivot()

    expect(pivot).toBeInstanceOf(Pivot)
  })
})
