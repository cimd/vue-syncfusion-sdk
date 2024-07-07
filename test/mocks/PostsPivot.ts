import { Pivot } from '../../src/index.ts'
import Post from './datasets/PostInterface.js'

export default class PostsPivot extends Pivot<Post> {

  constructor() {
    super({ id: 'pivot', stateVersion: 0 })
  }
}
