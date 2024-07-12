import { Grid, RecordDoubleClickEventArgs } from '@syncfusion/ej2-vue-grids'
import { reactive, ref } from 'vue'
import _isEqual from 'lodash/isEqual'
import sleep from '../Helpers/sleep'
import SyncfusionComponent from '../Components/SyncfusionComponent'

export default abstract class DataGrid<T> implements SyncfusionComponent {
  declare data: T[]
  id: string
  $component: Grid

  protected isInitialized = false
  protected heightOffset = 350
  $height = ref('500px')
  /**
   * Grid persistence stage version
   */
  stateVersion = 0

  protected constructor(config: { id: string, stateVersion: number })
  {
    if (!config.id) {
      throw new Error('Component ID is required')
    }

    this.id = config.id
    if (config.stateVersion) { this.stateVersion = config.stateVersion }

    this.$component = new Grid()
  }

  /**
   * To initialize the grid after mounted hook
   *
   */
  init(): void
  {
    this.$component = (<any>document.getElementById(this.id))?.ej2_instances[ 0 ]
    if (this.$component === undefined) {
      throw new Error('Grid Component could not be found')
    }

    // this.persistedState.id = this.id

    this.isInitialized = true
    this.updateDataSource(this.data)

    this.onInit()
  }

  protected onInit(): void

  /**
   * Updates the grid dataSource
   * @param { T[] } data Data to add to the grid
   */
  protected updateDataSource<T>(data: T[]): void
  {
    if (_isEqual(this.data, data)) return

    this.data = reactive([...data])
    if(this.isInitialized) {
      this.$component.dataSource = [...this.data]
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

    this.$component.addRecord(data, index)
  }
  /**
   * Add an array to the grid
   * @param { any[] } data Data to add to the grid
   */
  batchAdd(data: any[]): void
  {
    if (!this.isInitialized) return

    this.$component.dataSource = [...this.$component.dataSource, ...data]
  }

  /**
   * To update an existing item in the grid
   */
  update(data: any): void
  {
    if (!this.isInitialized) return

    const index = this.$component.getRowIndexByPrimaryKey(data.id)
    this.$component.updateRow(index, data)
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
  delete(data: T[], id = 'id')
  {
    if (!this.isInitialized) return

    this.$component.deleteRecord(id, data)
  }
  /**
   * To delete an array of existing items from the grid
   */
  batchDelete(data: T[], id = 'id')
  {
    if (!this.isInitialized) return

    data.forEach((element) => {
      this.delete(element, id)
    })
  }

  /**
   * Return selected items from the grid
   */
  selected(): T[]
  {
    return this.$component.getSelectedRecords()
  }

  /**
   * Refresh the grid
   */
  refresh()
  {
    if (!this.isInitialized) return

    this.$component.dataSource = [...this.data]
  }

  getRows()
  {
    const rows = this.$component.getDataRows()
    const dataRows: any[] = []
    rows.forEach((element: any) => {
      const rowData = this.$component.getRowInfo(element).rowData
      dataRows.push(rowData)
    })
    return dataRows
  }

  showColumns(args: any[]) {
    const columnsToToggle = this.$component.columns.filter((element: { visible: any; field: string }) => {
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
      this.$component.showColumns(fieldsToToggle, 'field')
    }
  }

  hideColumns(args: string | any[]) {
    const columnsToToggle = this.$component.columns.filter((element: { visible: any; field: string }) => {
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
      this.$component.hideColumns(fieldsToToggle, 'field')
    }
  }

  persistState(){
    window.localStorage.setItem('grid' + this.id, this.$component.getPersistData())
  }

  /**
   * Saves the changes to datasource and ends the grid edit mode
   * Applicable for grid in batch edit mode
   */
  save()
  {
    if (!this.isInitialized) return

    this.$component.endEdit()
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
      args.filterChoiceCount = length ?? this.$component.dataSource.length
    }
  }

  isFiltered()
  {
    console.log(Object.keys(this.$component.filterModule.values))
    return this.$component.filterModule.value === undefined
  }

  showSpinner()
  {
    // setTimeout(() => {
    this.$component.showSpinner()
    // }, 50)
  }
  hideSpinner()
  {
    this.$component.hideSpinner()
  }

  async onLoad()
  {
    // const gridState = await db.grids.get(this.gridId)
    // console.log(gridState)
    // console.log(this.$component)
  }

  /**
   * Return grid's persisted state
   * @protected
   */
  getLayout(): string
  {
    return this.$component.getPersistData()
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
    this.$component.columns = config.columns
    this.$component.filterSettings = config.filterSettings
  }

  /**
   * Refreshes the grid with the stored layout on the server
   */
  async applyLayout(layout: any)
  {
    this.setLayout({
      columns: [...<any[]>layout.settings.columns],
      filterSettings: layout.settings.filterSettings,
    })

    this.onLayoutApplied(layout).then(async () => {
      await sleep(500)

      location.reload()
    })
  }

  async onLayoutApplied(_layout: any)
  {
    return
  }
}
