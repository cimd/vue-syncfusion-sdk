import { DataGrid } from '../../src/index.js'
import Post from './datasets/PostInterface.js'

export default class PostsGrid extends DataGrid<Post> {

  constructor() {
    super({ id: 'postsGrid', stateVersion: 0 })
  }
}
