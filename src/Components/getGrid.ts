import type { Grid } from '@syncfusion/ej2-vue-grids'
import type { DataManager, DataResult } from '@syncfusion/ej2-data'

interface IGrid<T> {
  instance: Grid
  dataSource: object | DataManager | DataResult

  add(data: T[], index?: any): void
  update(data: T): void
  save(): void
  batchUpdate(data: T[]): void
  delete(data: T[], id?: string): void
  batchDelete(data: T[], id?: string): void
  selected(): object[]
  refresh(): void
  getRows(): T[]
}
/**
 * If you only need a simple instance of the Grid Component
 * Returns the grid instance and its data source
 * @param gridId string The ID of the grid component
 *
 * @returns IGrid
 */
const getGrid = <T>(gridId: string): IGrid<T> => {
  const instance: Grid | null = document.getElementById(gridId)?.ej2_instances[ 0 ]
  let dataSource = null
  if (!instance) {
    throw new Error('Grid Component could not be found')
  }

  dataSource = instance?.dataSource
  return {
    instance,
    dataSource,
    /**
     * Add a new record to the grid
     * @param data
     * @param index
     *
     * @returns void
     */
    add(data: T[], index = undefined) {
      try {
        instance.addRecord(data, index)
      } catch (err) {
        console.log(err)
      }
    },
    update(data: T) {
      try {
        const index = instance.getRowIndexByPrimaryKey(data.id)
        instance.updateRow(index, data)
      } catch (err) {
        console.log(err)
      }
    },
    save() {
      try {
        instance.endEdit()
      } catch (err) {
        console.log(err)
      }
    },
    batchUpdate(data: T[]) {
      try {
        data.forEach((element) => {
          this.update(element)
        })
      } catch (err) {
        console.log(err)
      }
    },
    delete(data: T[], id = 'id') {
      try {
        instance.deleteRecord(id, data)
      } catch (err) {
        console.log(err)
      }
    },
    batchDelete(data: T[], id = 'id') {
      try {
        data.forEach((element) => {
          this.delete(element, id)
        })
      } catch (err) {
        console.log(err)
      }
    },
    // Methods
    selected() {
      return instance.getSelectedRecords()
    },
    refresh() {
      instance.refresh()
    },
    getRows(): T[] {
      const rows = instance.getDataRows()
      const dataRows: T[] = []
      rows.forEach((element: any) => {
        const rowData = instance.getRowInfo(element).rowData
        dataRows.push(rowData)
      })
      return dataRows
    }
  }
}

export default getGrid
