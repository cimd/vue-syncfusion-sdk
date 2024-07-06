import { reactive } from 'vue'
import ILayout from 'modules/Config/models/Layout/LayoutInterface'
import LayoutApi from 'modules/Config/models/Layout/LayoutApi'
import SyncfusionComponent from '@/Components/SyncfusionComponent'
import { Grid } from '@syncfusion/ej2-vue-grids'
import StatePersistance from '@/Components/StatePersistance'

type position = 'Below' | 'Above' | 'Child'

export default class Gantt implements SyncfusionComponent {
  declare data: any[]
  declare id: string
  componentType = 'gantt'
  $component = undefined as any | undefined
  protected isInitialized = false
  public $dataSource = reactive<any[]>([])
  stateVersion: number = 0
  persistedState: StatePersistance

  constructor(id: string)
  {
    if (!id) {
      throw new Error('Component ID is required')
    }

    this.id = id
    this.$component = new Grid()
    this.persistedState = new StatePersistance('gantt')
  }

  /**
   * To initialize the grid after mounted hook
   * @param { string } id Grid ID. Will use default grid if not specified.
   */
  init()
  {
    if (!this.id) {
      throw new Error('Component ID is required')
    }

    this.$component = document?.getElementById(this.id)?.ej2_instances[ 0 ]
    // this.showSpinner()
    this.$component.dataSource = this.data
    Object.assign(this.$dataSource, this.$component.dataSource)
    this.isInitialized = true
  }

  updateDataSource(data: any[])
  {
    this.$component.updateDataSource(data)
  }

  /**
   * Sets the grid height
   * @param { number } offset Value to offset the grid height to
   */
  $height(offset?: number): string
  {
    let val = 350
    if (typeof offset !== 'undefined') val = offset
    return (screen.height - val) + 'px'
  }

  /**
   * Add a new item to the grid
   * @param { any | any[] } data Data to add to the grid
   * @param { position } position Position of the new item
   * @param { boolean } save If change should be saved to server
   */
  async add(data: any | any[], position: position = 'Below', save: boolean = true): Promise<void>
  {
    try {
      if (save) {
        const result = await this.api.batchStore(data)
        this.$component.addRecord(result.data, position)
      }
      else {
        this.$component.addRecord(data, position)
      }
    }
    catch (e) {
      console.error(e)
    }
  }
  /**
   * Add an array to the grid
   * @param { any | any[] } data Data to add to the grid
   * @param { position } position Position of the new item
   * @param { boolean } save If change should be saved to server
   */
  async batchAdd(data: any[], position: position = 'Below', save = true): Promise<void>
  {
    await this.add(data, position, save)
  }

  /**
   * To update an existing item in the grid
   */
  async update(data: any, save = true): Promise<void>
  {
    try {
      if (save) {
        await this.api.update(data)
      }
      this.$component.updateRecordByID(data)
    }
    catch (e) {
      console.error(e)
    }
  }
  /**
   * To update an array of existing items in the grid
   * @param { any[] } data Data to add to the grid
   * @param { boolean } save If change should be saved to server
   */
  async batchUpdate(data: any[], save = true): Promise<any>
  {
    try {
      data.forEach((element: any) => {
        this.$component.updateRecordByID(element)
      })
      if (save) {
        await this.api.batchUpdate(data)
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  /**
   * To delete an existing item or array from the grid
   * @param { any[] } data Data to add to the grid
   * @param { boolean } save If change should be saved to server
   */
  async delete(data: any[], save: boolean = true): Promise<any>
  {
    try {

      this.$component.deleteRecord(data)
      if (save) {
        await this.api.batchDestroy(data)
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  /**
   * To delete an array of existing items from the grid
   */
  async batchDelete(data: any | any[], save = true): Promise<any>
  {
    await this.delete(data, save)
  }

  /**
   * Return selected tasks data from the grid
   */
  selected(): any[]
  {
    const selectedRows = this.$component.selectionModule.getSelectedRecords()
    const tasksData: any[] = []
    selectedRows.forEach((element: any) => {
      tasksData.push(element.taskData)
    })
    return tasksData
  }

  /**
   * Return selected records from the grid
   */
  selectedTasks(): any[]
  {
    return this.$component.selectionModule.getSelectedRecords()
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
    sortSettings: any,
  }): void
  {
    this.$component.columns = [...config.columns]
    this.$component.sortSettings = Object.assign({}, config.sortSettings)

    localStorage.setItem('gantt' + this.id, JSON.stringify(config))
  }

  /**
   * Refreshes the grid with the stored layout on the server
   */
  async applyLayout(layout: ILayout)
  {
    this.setLayout({
      columns: [...<any[]>layout.settings.columns],
      sortSettings: Object.assign({}, layout.settings.sortSettings),
    })

    await LayoutApi.select(<number>layout.id)

    const { visible, hidden } = this.getColumnsVisibility(<any[]>layout.settings.columns)
    this.$component.showColumn(visible)
    this.$component.hideColumn(hidden)

    const el = document.getElementById('applied-layout-name')
    if (el !== null) {
      el.value = layout.name
    }
  }

  loadLayoutFromLocalStorage(): void
  {
    const layout: any = JSON.parse(<string>localStorage.getItem('gantt' + this.id))
    if (!layout) return

    const { visible, hidden } = this.getColumnsVisibility(layout.columns)
    this.$component.showColumn(visible)
    this.$component.hideColumn(hidden)
  }

  protected getColumnsVisibility(columns: any[])
  {
    let visibleColumns: any[] = []
    let hiddenColumns: any[] = []

    columns.forEach((column: any) => {
      if (column.visible) {
        visibleColumns = [...visibleColumns, column.headerText]
      } else {
        hiddenColumns = [...hiddenColumns, column.headerText]
      }
    })

    return {
      visible: visibleColumns,
      hidden: hiddenColumns,
    }
  }
}
