import type ComponentType from '@/Sdk/ComponentType'
import type { ColumnModel } from '@syncfusion/ej2-vue-grids'

export default class StatePersistance {
  type: ComponentType
  _id = ''
  _state: any = undefined
  protected localStorageId = ''

  constructor(type: ComponentType, id?: string) {
    this.type = type

    if (id) {
      this.id = id
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
  }

  async setLocalStorage() {
    if (this._state) {
      localStorage.setItem(this.localStorageId, JSON.stringify(this._state))
      return true
    }

    localStorage.setItem(this.localStorageId, JSON.stringify(state))

    return true
  }

  deleteLocalStorage()
  {
    localStorage.removeItem(this.localStorageId)
  }

  async addColumn(column: ColumnModel)
  {
    return
  }
  updateColumn()
  {
    return
  }
}
