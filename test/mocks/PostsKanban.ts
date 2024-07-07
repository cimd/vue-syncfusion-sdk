import { Kanban } from '../../src/index.ts'
import Post from './datasets/PostInterface.js'
import Station from './datasets/StationInterface.js'

export default class PostsKanban extends Kanban<Post, Station> {

  constructor() {
    super({ id: 'kanban', stateVersion: 0 })
  }
}
