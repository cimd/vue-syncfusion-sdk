import { Grid, RecordDoubleClickEventArgs } from '@syncfusion/ej2-vue-grids'
import { onBeforeUnmount, reactive, ref } from 'vue'
import _isEqual from 'lodash/isEqual'
import ILayout from 'modules/Config/models/Layout/LayoutInterface'
import LayoutApi from 'modules/Config/models/Layout/LayoutApi'
import sleep from 'src/app/helpers/Sleep'
import StatePersistance from './StatePersistance'

export default class DataGrid {
  declare data: any[]
  declare id: string
  $grid: Grid

  protected isInitialized = false
  protected heightOffset = 350
  $height = ref('500px')
  persistedState: StatePersistance
  componentType = 'grid'
  /**
   * Grid persistence stage version
   */
  stateVersion = 1

  constructor()
  {
    super()
    this.$grid = new Grid()
    this.persistedState = new StatePersistance('grid')
  }

  /**
   * To initialize the grid after mounted hook
   *
   */
  init(): void
  {
    if (!this.id) {
      throw new Error('Component ID is required')
    }

    this.$grid = (<any>document.getElementById(this.id))?.ej2_instances[ 0 ]
    if (this.$grid === undefined) {
      throw new Error('Grid Component could not be found')
    }

    this.persistedState.id = this.id

    this.isInitialized = true
    this.updateDataSource(this.data)

    onBeforeUnmount(async () => {
      if (
        (this.id === 'sepGrid') ||
        (this.id === 'SelHeaderGrid') ||
        (this.id === 'CallOffGrid') ||
        (this.id === 'MocsGrid') ||
        (this.id === 'HazobGrid')
      ) {
        this.persistedState.state = this.getLayout()

        setTimeout(() => {
          this.persistedState.deleteLocalStorage()
        }, 50)
      }

      this.isInitialized = false
    })
  }

  /**
   * Updates the grid dataSource
   * @deprecated Use updateDataSource instead
   * @param { any[] } data Data to add to the grid
   */
  protected initRefresh(data: any[])
  {
    this.updateDataSource(data)
  }

  /**
   * Updates the grid dataSource
   * @param { T[] } data Data to add to the grid
   */
  protected updateDataSource<T>(data: T[]): void
  {
    if (_isEqual(this.data, data)) return

    this.data = reactive([...data])
    if(this.isInitialized) {
      this.$grid.dataSource = [...this.data]
    }
  }

  /**
   * Sets the grid height
   * @param { number } offset Value to offset the grid height to
   */
  setHeight(offset?: number): void
  {
    // console.log('setHeight', offset)
    // console.log('screen.height', screen.height)
    let val = 350
    if (typeof offset !== 'undefined') val = offset

    this.$height.value = (screen.height - val) + 'px'
    // console.log(this.$height.value)
  }

  /**
   * Add a new item to the grid
   * @param { any[] } data Data to add to the grid
   * @param { number | null } index Position of the new item
   */
  add(data: any[], index: number | null = null)
  {
    if (!this.isInitialized) return

     
    // @ts-ignore
    this.$grid.addRecord(data, index)
  }
  /**
   * Add an array to the grid
   * @param { any[] } data Data to add to the grid
   */
  batchAdd(data: any[]): void
  {
    if (!this.isInitialized) return

    this.$grid.dataSource = [...this.$grid.dataSource, ...data]
  }

  /**
   * To update an existing item in the grid
   */
  update(data: any): void
  {
    if (!this.isInitialized) return

    const index = this.$grid.getRowIndexByPrimaryKey(data.id)
    this.$grid.updateRow(index, data)
  }
  /**
   * To update an array of existing items in the grid
   */
  batchUpdate(data: any[])
  {
    if (!this.isInitialized) return

    data.forEach((element) => {
      this.update(element)
    })
  }

  /**
   * To delete an existing item from the grid
   */
  delete(data: any[], id = 'id')
  {
    if (!this.isInitialized) return
    console.log('deleting')

    this.$grid.deleteRecord(id, data)
  }
  /**
   * To delete an array of existing items from the grid
   */
  batchDelete(data: any[], id = 'id')
  {
    if (!this.isInitialized) return

    data.forEach((element) => {
      this.delete(element, id)
    })
  }

  /**
   * Return selected items from the grid
   */
  selected(): any[]
  {
    return this.$grid.getSelectedRecords()
  }

  /**
   * Refresh the grid
   */
  refresh()
  {
    if (!this.isInitialized) return

    this.$grid.dataSource = [...this.data]
  }

  getRows()
  {
    const rows = this.$grid.getDataRows()
    const dataRows: any[] = []
    rows.forEach((element: any) => {
      const rowData = this.$grid.getRowInfo(element).rowData
      dataRows.push(rowData)
    })
    return dataRows
  }

  showColumns(args: any[]) {
    const columnsToToggle = this.$grid.columns.filter((element: { visible: any; field: string }) => {
      if (
      // Only toggle if column is currently hidden
        (!element.visible) &&
          (args.includes(element.field))
          // Only toggle if column is in args
      ) {
        return element.field
      }
    })
    const fieldsToToggle = columnsToToggle.map((element: { field: string }) => element.field)
    console.log('showColumns: ', fieldsToToggle)
    if (fieldsToToggle.length > 0) {
      this.$grid.showColumns(fieldsToToggle, 'field')
    }
  }

  hideColumns(args: string | any[]) {
    const columnsToToggle = this.$grid.columns.filter((element: { visible: any; field: string }) => {
      if (
      // Only toggle if column is currently visible
        (element.visible) &&
          (args.includes(element.field))
          // Only toggle if column is in args
      ) {
        return element.field
      }
    })
    const fieldsToToggle = columnsToToggle.map((element: { field: any }) => element.field)
    console.log('hideColumns: ', fieldsToToggle)
    if (fieldsToToggle.length > 0) {
      this.$grid.hideColumns(fieldsToToggle, 'field')
    }
  }

  persistState(){
    window.localStorage.setItem('grid' + this.id, this.$grid.getPersistData())
  }

  /**
   * Saves the changes to datasource and ends the grid edit mode
   * Applicable for grid in batch edit mode
   */
  save()
  {
    if (!this.isInitialized) return

    this.$grid.endEdit()
  }

  /**
   * Syncfusion Event
   *
   * @param { RecordDoubleClickEventArgs } args
   */
  recordDoubleClick(args: RecordDoubleClickEventArgs)
  {
    this.onDoubleClick(args.rowData)
  }

  /**
   * Hook for Syncfusion's recordDoubleClick event
   */
  protected onDoubleClick<T>(row: T)
  {
    return row
  }

  /**
   * Increase the length of the grid filter
   * @param { any } args Args on the ActionBegin event
   * @param { number } length Number of rows to include, or all rows if not specified
   */
  setFilterLength(args: any, length?: number)
  {
    if (args.requestType === 'filterchoicerequest') {
      args.filterChoiceCount = length ?? this.$grid.dataSource.length
    }
  }

  isFiltered()
  {
    console.log(Object.keys(this.$grid.filterModule.values))
    return this.$grid.filterModule.value === undefined
  }

  showSpinner()
  {
    // setTimeout(() => {
    this.$grid.showSpinner()
    // }, 50)
  }
  hideSpinner()
  {
    this.$grid.hideSpinner()
  }

  async onLoad()
  {
    // const gridState = await db.grids.get(this.gridId)
    // console.log(gridState)
    // console.log(this.$grid)
  }

  protected broadcastCreated(e: any): void
  {
    this.api.show(e.id).then((response: { data: any }) => {
      this.add(response.data)
    })
  }
  protected broadcastUpdated(e: any): void
  {
    this.api.show(e.id).then((response: { data: any }) => {
      this.update(response.data)
    })
  }
  protected broadcastDeleted(e: any): void
  {
    console.log(e)
    this.delete(e.id)
  }

  /**
   * Return grid's persisted state
   * @protected
   */
  getLayout(): string
  {
    return this.$grid.getPersistData()
  }

  /**
   * Set the grid state
   * @protected
   */
  protected setLayout(config: {
    columns: any[],
    filterSettings: any,
  }): void
  {
    this.$grid.columns = config.columns
    this.$grid.filterSettings = config.filterSettings
  }

  /**
   * Refreshes the grid with the stored layout on the server
   */
  async applyLayout(layout: ILayout)
  {
    this.setLayout({
      columns: [...<any[]>layout.settings.columns],
      filterSettings: layout.settings.filterSettings,
    })

    await LayoutApi.select(<number>layout.id)

    await sleep(500)

    location.reload()
  }
}
