import type { Grid } from '@syncfusion/ej2-vue-grids'
import type { DataManager, DataResult } from '@syncfusion/ej2-data'

interface IGrid {
  instance: Grid
  dataSource: object | DataManager | DataResult

  add(data: any[], index?: any): void
  update(data: any): void
}
/**
 * If you only need a simple instance of the Grid Component
 * Returns the grid instance and its data source
 * @param gridId string The ID of the grid component
 */
const getGrid = (gridId: string): IGrid => {
  const instance: Grid | null = document.getElementById(gridId)?.ej2_instances[ 0 ]
  let dataSource = null
  if (!instance) {
    throw new Error('Grid Component could not be found')
  }

  dataSource = instance?.dataSource
  return {
    instance,
    dataSource,
    // CRUD
    add(data: any[], index = undefined) {
      try {
        instance.addRecord(data, index)
      } catch (err) {
        console.log(err)
      }
    },
    update(data: any) {
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
    batchUpdate(data: any[]) {
      try {
        data.forEach((element) => {
          this.update(element)
        })
      } catch (err) {
        console.log(err)
      }
    },
    delete(data: any[], id = 'id') {
      try {
        instance.deleteRecord(id, data)
      } catch (err) {
        console.log(err)
      }
    },
    batchDelete(data: any[], id = 'id') {
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
      if (!instance) return

      instance.refresh()
    },
    getRows() {
      const rows = instance.getDataRows()
      const dataRows: any[] = []
      rows.forEach((element: any) => {
        const rowData = instance.getRowInfo(element).rowData
        dataRows.push(rowData)
      })
      return dataRows
    }
  }
}

export default getGrid
