import type { Grid } from '@syncfusion/ej2-vue-grids'

/**
 * If you only need a simple instance of the Grid Component
 * Returns the grid instance and its data source
 * @param gridId string The ID of the grid component
 */
const GridInstance = (gridId: string): any => {
  const gridObj: Grid | null = document.getElementById(gridId)?.ej2_instances[ 0 ]
  const dataSource = gridObj?.dataSource
  return {
    gridObj,
    dataSource,
    // CRUD
    add(data: any[], index = undefined) {
      if (!gridObj) return

      try {
        gridObj.addRecord(data, index)
      } catch (err) {
        console.log(err)
      }
    },
    update(data: any) {
      if (!gridObj) return

      try {
        const index = gridObj.getRowIndexByPrimaryKey(data.id)
        gridObj.updateRow(index, data)
      } catch (err) {
        console.log(err)
      }
    },
    save() {
      if (!gridObj) return

      try {
        gridObj.endEdit()
      } catch (err) {
        console.log(err)
      }
    },
    batchUpdate(data: any[]) {
      if (!gridObj) return

      try {
        data.forEach((element) => {
          this.update(element)
        })
      } catch (err) {
        console.log(err)
      }
    },
    delete(data: any[], id = 'id') {
      if (!gridObj) return

      try {
        gridObj.deleteRecord(id, data)
      } catch (err) {
        console.log(err)
      }
    },
    batchDelete(data: any[], id = 'id') {
      if (!gridObj) return

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
      if (!gridObj) return []

      return gridObj.getSelectedRecords()
    },
    refresh() {
      if (!gridObj) return

      gridObj.refresh()
    },
    getRows() {
      if (!gridObj) return

      const rows = gridObj.getDataRows()
      const dataRows: any[] = []
      rows.forEach((element: any) => {
        const rowData = gridObj.getRowInfo(element).rowData
        dataRows.push(rowData)
      })
      return dataRows
    }
  }
}

export default GridInstance
