import { Grid, RecordDoubleClickEventArgs } from '@syncfusion/ej2-vue-grids';
export default abstract class SyncfusionComponent {
    abstract data: any[];
    abstract id: string;
    abstract $component: Grid;
    abstract stateVersion: number;
    abstract init(): void;
    abstract onInit(): void;
    abstract updateDataSource<T>(data: T[]): void;
    abstract refresh(): void;
    abstract add(data: any[], index: number | null): void;
    abstract update(data: any): void;
    abstract delete(data: any[], id: string): void;
    abstract selected(): any[];
    abstract recordDoubleClick(args: RecordDoubleClickEventArgs): void;
    abstract getLayout(): string;
    abstract setLayout(config: {
        columns: any[];
        filterSettings: any;
    }): void;
    abstract applyLayout(layout: any): Promise<void>;
    abstract onLayoutApplied(layout: any): Promise<void>;
}
