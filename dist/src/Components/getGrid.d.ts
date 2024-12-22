import { Grid } from '@syncfusion/ej2-vue-grids';
import { DataManager, DataResult } from '@syncfusion/ej2-data';
interface IGrid<T> {
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
}
/**
 * If you only need a simple instance of the Grid Component
 * Returns the grid instance and its data source
 * @param gridId string The ID of the grid component
 *
 * @returns IGrid
 */
declare const getGrid: <T>(gridId: string) => IGrid<T>;
export default getGrid;
