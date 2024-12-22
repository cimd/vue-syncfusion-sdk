import { Gantt } from '@syncfusion/ej2-vue-gantt';
import { DataManager, DataResult } from '@syncfusion/ej2-data';
interface IGantt {
    instance: Gantt;
    dataSource: object | DataManager | DataResult;
    selected(): any[];
}
declare const getGantt: (ganttId: string) => IGantt;
export default getGantt;
