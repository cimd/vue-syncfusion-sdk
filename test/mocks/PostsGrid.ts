import { DataGrid } from '@/index'
import type Post from './datasets/PostInterface.js'

export default class PostsGrid extends DataGrid<Post> {

  constructor() {
    super({ id: 'grid', stateVersion: 0 })
  }
}
