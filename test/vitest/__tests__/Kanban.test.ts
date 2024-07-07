import { describe, expect, it } from 'vitest'
import PostsKanban from '../../mocks/PostsKanban.js'


describe('Kanban', () => {
  it('creates', async () => {
    const kanban = new PostsKanban()

    expect(kanban).toBeInstanceOf(PostsKanban)
  })
})
