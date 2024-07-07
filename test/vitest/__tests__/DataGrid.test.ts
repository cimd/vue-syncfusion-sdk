import { describe, expect, it } from 'vitest'
import PostsGrid from '../../mocks/PostsGrid.js'


describe('DataGrid', () => {
  it('creates', async () => {
    const grid = new PostsGrid()

    expect(grid).toBeInstanceOf(PostsGrid)
  })
})
