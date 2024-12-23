import { Gantt } from '@syncfusion/ej2-vue-gantt';
import { DataManager, DataResult } from '@syncfusion/ej2-data';
/**
 * Retrieves the Gantt component instance and its associated data.
 *
 * @param ganttId - The ID of the HTML element containing the Gantt component.
 * @returns An object containing:
 *   - instance: The Gantt component instance.
 *   - dataSource: The data source of the Gantt component.
 *   - selected: A function that returns an array of selected row records.
 * @throws {Error} If the Gantt component cannot be found.
 */
declare const getGantt: (ganttId: string) => {
    instance: Gantt;
    dataSource: object | DataManager | DataResult;
    selected(): any[];
};
export default getGantt;
