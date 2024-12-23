import type { Grid, RecordDoubleClickEventArgs } from '@syncfusion/ej2-vue-grids'
import type { Gantt } from '@syncfusion/ej2-gantt'
import type { PivotView } from '@syncfusion/ej2-pivotview/src/pivotview/base/pivotview'

export default abstract class SyncfusionComponent {
    abstract data: any[]
    abstract id: string
    abstract instance: Grid | Gantt | PivotView
    abstract stateVersion: number

    abstract init (): void
    abstract onInit (): void
    abstract updateDataSource<T> (data: T[]): void
    abstract refresh (): void

    abstract add (T: any[], index?: number): void
    abstract update (data: any): void
    abstract delete (data: any[], id: string): void
    abstract selected (): any[]

    abstract recordDoubleClick (args: RecordDoubleClickEventArgs): void

    abstract getLayout (): string
    abstract setLayout (config: {
        columns: any[],
        filterSettings: any,
    }): void
    abstract applyLayout (layout: any): Promise<void>
    abstract onLayoutApplied (layout: any): Promise<void>
}
