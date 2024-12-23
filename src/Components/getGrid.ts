import type { Grid } from '@syncfusion/ej2-vue-grids'
import type { DataManager, DataResult } from '@syncfusion/ej2-data'

/**
 * Creates and returns a grid instance with associated methods for data manipulation.
 *
 * @template T - The type of data in the grid.
 * @param {string} gridId - The ID of the grid component in the DOM.
 * @returns {Object} An object containing the grid instance, data source, and methods for grid manipulation.
 * @property {Grid} instance - The Syncfusion Grid instance.
 * @property {object | DataManager | DataResult} dataSource - The data source of the grid.
 * @property {function} add - Adds new records to the grid.
 * @property {function} update - Updates a record in the grid.
 * @property {function} save - Saves the current edit state of the grid.
 * @property {function} batchUpdate - Updates multiple records in the grid.
 * @property {function} delete - Deletes records from the grid.
 * @property {function} batchDelete - Deletes multiple records from the grid.
 * @property {function} selected - Returns the selected records in the grid.
 * @property {function} refresh - Refreshes the grid.
 * @property {function} getRows - Returns all rows of the grid as an array.
 * @throws {Error} Throws an error if the Grid Component is not found.
 */
const getGrid = <T>(gridId: string): {
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
} => {
  const instance: Grid | null = (document.getElementById(gridId) as any)?.ej2_instances[ 0 ]
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
     * @param {T[]} data - The data to be added to the grid.
     * @param {any} [index] - The index at which to insert the new record.
     */
    add(data: T[], index = undefined) {
      try {
        instance.addRecord(data, index)
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * Update a record in the grid
     * @param {T} data - The updated data for the record.
     */
    update(data: T) {
      try {
        const index = instance.getRowIndexByPrimaryKey(data.id)
        instance.updateRow(index, data)
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * Save the current edit state of the grid
     */
    save() {
      try {
        instance.endEdit()
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * Update multiple records in the grid
     * @param {T[]} data - An array of records to be updated.
     */
    batchUpdate(data: T[]) {
      try {
        data.forEach((element) => {
          this.update(element)
        })
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * Delete records from the grid
     * @param {T[]} data - The records to be deleted.
     * @param {string} [id='id'] - The primary key field name.
     */
    delete(data: T[], id = 'id') {
      try {
        instance.deleteRecord(id, data)
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * Delete multiple records from the grid
     * @param {T[]} data - An array of records to be deleted.
     * @param {string} [id='id'] - The primary key field name.
     */
    batchDelete(data: T[], id = 'id') {
      try {
        data.forEach((element) => {
          this.delete(element, id)
        })
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * Get the selected records from the grid
     * @returns {object[]} An array of selected records.
     */
    selected() {
      return instance.getSelectedRecords()
    },
    /**
     * Refresh the grid
     */
    refresh() {
      instance.refresh()
    },
    /**
     * Get all rows of the grid as an array
     * @returns {T[]} An array of all row data.
     */
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
