import { Grid } from '@syncfusion/ej2-vue-grids';
import { DataManager, DataResult } from '@syncfusion/ej2-data';
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
declare const getGrid: <T>(gridId: string) => {
    instance: Grid;
    dataSource: object | DataManager | DataResult;
    add(data: T[], index?: any): void;
    update(data: T): void;
    save(): void;
    batchUpdate(data: T[]): void;
    delete(data: T[], id?: string): void;
    batchDelete(data: T[], id?: string): void;
    selected(): object[];
    refresh(): void;
    getRows(): T[];
};
export default getGrid;
