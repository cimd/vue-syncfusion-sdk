import { reactive } from 'vue'
import type SyncfusionComponent from '@/Sdk/SyncfusionComponent'
import { Gantt as SyncfusionGantt } from '@syncfusion/ej2-gantt'

type position = 'Below' | 'Above' | 'Child'

export default abstract class Gantt<T> implements SyncfusionComponent {
  declare data: T[]
  id: string
  $component = new SyncfusionGantt
  protected isInitialized = false
  $dataSource = reactive<T[]>([])
  stateVersion = 0

  constructor(config: { id: string, stateVersion: number })
  {
    if (!config.id) {
      throw new Error('Component ID is required')
    }

    this.id = config.id
    if (config.stateVersion) { this.stateVersion = config.stateVersion }
  }

  /**
   * To initialize the grid after mounted hook
   * @param { string } id Grid ID. Will use default grid if not specified.
   */
  init()
  {
    this.$component = document?.getElementById(this.id)?.ej2_instances[ 0 ]
    if (this.$component === undefined) {
      throw new Error('Gantt Component could not be found')
    }

    this.$component.dataSource = this.data
    Object.assign(this.$dataSource, this.$component.dataSource)
    this.isInitialized = true
  }

  updateDataSource(data: any[])
  {
    (this.$component as SyncfusionGantt).updateDataSource(data)
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
  async add(data: T | T[], position: position = 'Below', save = true): Promise<void>
  {
    try {
      if (save) {
        const result = await this.beforeAdd(data)
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

  async beforeAdd(data: T): Promise<any>
  {
    return
  }
  /**
   * Add an array to the grid
   * @param { any | any[] } data Data to add to the grid
   * @param { position } position Position of the new item
   * @param { boolean } save If change should be saved to server
   */
  async batchAdd(data: T[], position: position = 'Below', save = true): Promise<void>
  {
    await this.add(data, position, save)
  }

  /**
   * To update an existing item in the grid
   */
  async update(data: T, save = true): Promise<void>
  {
    try {
      if (save) {
        await this.beforeUpdate(data)
      }
      this.$component.updateRecordByID(data)
    }
    catch (e) {
      console.error(e)
    }
  }
  async beforeUpdate(data: T): Promise<any>
  {
    return
  }

  /**
   * To update an array of existing items in the grid
   * @param { any[] } data Data to add to the grid
   * @param { boolean } save If change should be saved to server
   */
  async batchUpdate(data: T[], save = true): Promise<any>
  {
    try {
      data.forEach((element: any) => {
        this.$component.updateRecordByID(element)
      })
      if (save) {
        await this.beforeBatchUpdate(data)
      }
    }
    catch (e) {
      console.error(e)
    }
  }
  async beforeBatchUpdate(data: T): Promise<any>
  {
    return
  }

  /**
   * To delete an existing item or array from the grid
   * @param { any[] } data Data to add to the grid
   * @param { boolean } save If change should be saved to server
   */
  async delete(data: T[], save = true): Promise<any>
  {
    try {
      this.$component.deleteRecord(data)
      if (save) {
        await this.afterDelete(data)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  async afterDelete(data: T): Promise<any>
  {
    return
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
  selected(): T[]
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
  selectedTasks(): T[]
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
  async applyLayout(layout: any)
  {
    this.setLayout({
      columns: [...layout.settings.columns as any[]],
      sortSettings: Object.assign({}, layout.settings.sortSettings),
    })

    this.onLayoutApplied(layout).then()

    const { visible, hidden } = this.getColumnsVisibility((layout.settings.columns as any[]))
    this.$component.showColumn(visible)
    this.$component.hideColumn(hidden)

    const el = document.getElementById('applied-layout-name')
    if (el !== null) {
      el.value = layout.name
    }
  }

  async onLayoutApplied(layout: any)
  {
    return
  }

  loadLayoutFromLocalStorage(): void
  {
    const layout: any = JSON.parse((localStorage.getItem('gantt' + this.id) as string))
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
