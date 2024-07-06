import ComponentType from '../Components/ComponentType'
import { db } from '../../database/db'
import { config } from 'boot/config'
import GridTable from '../../database/GridTable'
import { ColumnModel } from '@syncfusion/ej2-vue-grids'

export default class StatePersistance {
  type: ComponentType
  _id: string = ''
  _state: any = undefined
  protected localStorageId: string = ''

  constructor(type: ComponentType, id?: string) {
    this.type = type

    if (id) {
      this.id = id
      db.grids.get(this._id).then(state => {
        if (!state) return

        this._state = state.data
      })
      // this.localStorageId = this.type + this.id
    }
  }

  set state(state: string) {
    this._state = JSON.parse(state)
    delete this._state.selectedRowIndex
    // console.log(this._state)

    this.update()
  }

  get state(){
    return this._state
  }

  set id(id: string) {
    this._id = id
    this.localStorageId = this.type + id
  }

  get id() {
    return this._id
  }

  async update()
  {
    // console.log(this.id)
    console.log('Updating Dexie', 'ID: ', this._id)
    return db.grids.put({
      data: this._state,
      id: this._id,
      type: this.type,
      updated_at: new Date(),
      version: config.appVersion,
    }, this._id)
  }

  async setLocalStorage() {
    if (this._state) {
      localStorage.setItem(this.localStorageId, JSON.stringify(this._state))
      return true
    }

    const state = await GridTable.find(this._id)
    if (!state) return false

    localStorage.setItem(this.localStorageId, JSON.stringify(state))

    return true
  }

  deleteLocalStorage()
  {
    localStorage.removeItem(this.localStorageId)
  }

  async addColumn(column: ColumnModel)
  {
    const layout = await db.grids.get(this._id)
    if (!layout) return

    layout.data.columns.push(column)
    layout.version = config.appVersion

    await db.grids.put(layout, this._id)
  }
  updateColumn()
  {

  }
}
