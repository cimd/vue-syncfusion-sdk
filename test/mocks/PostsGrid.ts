import { DataGrid } from '../../src/index.ts'
import Post from './datasets/PostInterface.js'

export default class PostsGrid extends DataGrid<Post> {

  constructor() {
    super({ id: 'grid', stateVersion: 0 })
  }
}
