import { Kanban } from '@/index'
import type Post from './datasets/PostInterface.js'
import type Station from './datasets/StationInterface.js'

export default class PostsKanban extends Kanban<Post, Station> {

  constructor() {
    super({ id: 'kanban', stateVersion: 0 })
  }
}
