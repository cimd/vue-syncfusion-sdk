import type { Gantt } from '@syncfusion/ej2-vue-gantt'
import type { DataManager, DataResult } from '@syncfusion/ej2-data'

interface IGantt {
    instance: Gantt
    dataSource: object | DataManager | DataResult

    selected(): any[]
}

const getGantt = (ganttId: string): IGantt => {
  const instance: Gantt | null = document.getElementById(ganttId)?.ej2_instances[ 0 ]
  let dataSource = null
  if (!instance) {
    throw new Error('Gantt Component could not be found')
  }

  dataSource = instance?.dataSource
  return {
    instance,
    dataSource,
    // Return the selected row records
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
