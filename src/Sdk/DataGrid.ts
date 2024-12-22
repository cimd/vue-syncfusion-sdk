import type { RecordDoubleClickEventArgs } from '@syncfusion/ej2-vue-grids'
import { Grid } from '@syncfusion/ej2-vue-grids'
import { ref } from 'vue'
import _isEqual from 'lodash/isEqual'
import sleep from '@/Helpers/sleep'
import type SyncfusionComponent from '@/Sdk/SyncfusionComponent'

export default class DataGrid<T> implements SyncfusionComponent {
  id: string
  instance: Grid

  protected isInitialized = false
  protected heightOffset = 350
  height = ref('720px')
  /**
   * Grid persistence stage version
   */
  stateVersion = 0

  constructor(config: { id: string, stateVersion?: number, heightOffset?: number }) {
    if (!config.id) {
      throw new Error('Component ID is required')
    }

    this.id = config.id
    if (config.stateVersion) { this.stateVersion = config.stateVersion }
    if (config.heightOffset) { this.heightOffset = config.heightOffset }

    this.instance = new Grid()
  }

  /**
   * To initialize the grid after mounted hook
   *
   */
  init(): void {
    this.instance = (document.getElementById(this.id) as any)?.ej2_instances[ 0 ]
    if (this.instance === undefined) {
      throw new Error('Grid Component could not be found')
    }

    this.setHeight()
    // this.persistedState.id = this.id
    this.isInitialized = true

    this.onInit()
  }

  protected onInit(): void {
    return
  }

  /**
   * Updates the grid dataSource
   * @param { T[] } data Data to add to the grid
   */
  updateDataSource<T>(data: T[]): void {
    if (_isEqual(this.instance.dataSource, data)) return

    if (this.isInitialized) {
      this.instance.dataSource = [...data]
    }
  }

  /**
   * Sets the grid height
   * @param { number } offset Value to offset the grid height to
   */
  setHeight(offset?: number): void {
    if (typeof offset !== 'undefined') this.heightOffset = offset

    this.height.value = (screen.height - this.heightOffset) + 'px'
  }

  /**
   * Add a new item to the grid
   * @param { any[] } data Data to add to the grid
   * @param { number | null } index Position of the new item
   */
  add(data: any[], index: number | null = null) {
    if (!this.isInitialized) return

    this.instance.addRecord(data, index)
  }
  /**
   * Add an array to the grid
   * @param { any[] } data Data to add to the grid
   */
  batchAdd(data: any[]): void {
    if (!this.isInitialized) return

    this.instance.dataSource = [...this.instance.dataSource, ...data]
  }

  /**
   * To update an existing item in the grid
   */
  update(data: any): void {
    if (!this.isInitialized) return

    const index = this.instance.getRowIndexByPrimaryKey(data.id)
    this.instance.updateRow(index, data)
  }
  /**
   * To update an array of existing items in the grid
   */
  batchUpdate(data: any[]) {
    if (!this.isInitialized) return

    data.forEach((element) => {
      this.update(element)
    })
  }

  /**
   * To delete an existing item from the grid
   */
  delete(data: T[], id = 'id') {
    if (!this.isInitialized) return

    this.instance.deleteRecord(id, data)
  }
  /**
   * To delete an array of existing items from the grid
   */
  batchDelete(data: T[], id = 'id') {
    if (!this.isInitialized) return

    data.forEach((element) => {
      this.delete(element, id)
    })
  }

  /**
   * Return selected items from the grid
   */
  selected(): T[] {
    return this.instance.getSelectedRecords()
  }

  /**
   * Refresh the grid
   */
  refresh(data: T[]) {
    if (!this.isInitialized) return

    this.instance.dataSource = [...data]
  }

  getRows() {
    const rows = this.instance.getDataRows()
    const dataRows: any[] = []
    rows.forEach((element: any) => {
      const rowData = this.instance.getRowInfo(element).rowData
      dataRows.push(rowData)
    })
    return dataRows
  }

  showColumns(args: any[]) {
    const columnsToToggle = this.instance.columns.filter((element: { visible: any; field: string }) => {
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
      this.instance.showColumns(fieldsToToggle, 'field')
    }
  }

  hideColumns(args: string | any[]) {
    const columnsToToggle = this.instance.columns.filter((element: { visible: any; field: string }) => {
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
      this.instance.hideColumns(fieldsToToggle, 'field')
    }
  }

  persistState() {
    window.localStorage.setItem('grid' + this.id, this.instance.getPersistData())
  }

  /**
   * Saves the changes to datasource and ends the grid edit mode
   * Applicable for grid in batch edit mode
   */
  save() {
    if (!this.isInitialized) return

    this.instance.endEdit()
  }

  /**
   * Syncfusion Event
   *
   * @param { RecordDoubleClickEventArgs } args
   */
  recordDoubleClick(args: RecordDoubleClickEventArgs) {
    this.onDoubleClick(args.rowData)
  }

  /**
   * Hook for Syncfusion's recordDoubleClick event
   */
  protected onDoubleClick<T>(row: T) {
    return row
  }

  /**
   * Increase the length of the grid filter
   * @param { any } args Args on the ActionBegin event
   * @param { number } length Number of rows to include, or all rows if not specified
   */
  setFilterLength(args: any, length?: number) {
    if (args.requestType === 'filterchoicerequest') {
      args.filterChoiceCount = length ?? this.instance.dataSource.length
    }
  }

  isFiltered() {
    console.log(Object.keys(this.instance.filterModule.values))
    return this.instance.filterModule.value === undefined
  }

  showSpinner() {
    // setTimeout(() => {
    this.instance.showSpinner()
    // }, 50)
  }
  hideSpinner() {
    this.instance.hideSpinner()
  }

  async onLoad() {
    // const gridState = await db.grids.get(this.gridId)
    // console.log(gridState)
    // console.log(this.instance)
  }

  /**
   * Return grid's persisted state
   * @protected
   */
  getLayout(): string {
    return this.instance.getPersistData()
  }

  /**
   * Set the grid state
   * @protected
   */
  protected setLayout(config: {
    columns: any[],
    filterSettings: any,
  }): void {
    this.instance.columns = config.columns
    this.instance.filterSettings = config.filterSettings
  }

  /**
   * Refreshes the grid with the stored layout on the server
   */
  async applyLayout(layout: any) {
    this.setLayout({
      columns: [...layout.settings.columns as any[]],
      filterSettings: layout.settings.filterSettings,
    })

    this.onLayoutApplied(layout).then(async () => {
      await sleep(500)

      location.reload()
    })
  }

  async onLayoutApplied(_layout: any) {
    return
  }
}
