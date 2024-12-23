import type { Gantt } from '@syncfusion/ej2-vue-gantt'
import type { DataManager, DataResult } from '@syncfusion/ej2-data'

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
const getGantt = (ganttId: string): {
  instance: Gantt
  dataSource: object | DataManager | DataResult
  selected(): any[]
} => {
  const instance: Gantt | null = (document.getElementById(ganttId) as any)?.ej2_instances[ 0 ]
  let dataSource = null
  if (!instance) {
    throw new Error('Gantt Component could not be found')
  }

  dataSource = instance?.dataSource
  return {
    instance,
    dataSource,
    /**
     * Returns an array of selected row records from the Gantt component.
     *
     * @returns An array of task data objects for the selected rows.
     */
    selected() {
      const selectedRows = instance.selectionModule.getSelectedRecords()
      const tasksData: any[] = []
      selectedRows.forEach((element: any) => {
        tasksData.push(element.taskData)
      })
      return tasksData
    },
  }
}

export default getGantt
