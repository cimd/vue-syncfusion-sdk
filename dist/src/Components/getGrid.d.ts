import { Grid } from '@syncfusion/ej2-vue-grids';
import { DataManager, DataResult } from '@syncfusion/ej2-data';
interface IGrid {
    instance: Grid;
    dataSource: object | DataManager | DataResult;
    add(data: any[], index?: any): void;
    update(data: any): void;
}
/**
 * If you only need a simple instance of the Grid Component
 * Returns the grid instance and its data source
 * @param gridId string The ID of the grid component
 */
declare const getGrid: (gridId: string) => IGrid;
export default getGrid;
