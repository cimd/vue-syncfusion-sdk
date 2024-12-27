import { RecordDoubleClickEventArgs, Grid } from '@syncfusion/ej2-vue-grids';
import { default as SyncfusionComponent } from './SyncfusionComponent';
export default class DataGrid<T> implements SyncfusionComponent {
    id: string;
    instance: Grid;
    protected isInitialized: boolean;
    protected heightOffset: number;
    height: import('vue').Ref<string, string>;
    /**
     * Grid persistence stage version
     */
    stateVersion: number;
    constructor(config: {
        id: string;
        stateVersion?: number;
        heightOffset?: number;
    });
    /**
     * To initialize the grid after mounted hook
     *
     */
    init(): void;
    protected onInit(): void;
    /**
     * Updates the grid dataSource
     * @param { T[] } data Data to add to the grid
     */
    updateDataSource<T>(data: T[]): void;
    /**
     * Sets the grid height
     * @param { number } offset Value to offset the grid height to
     */
    setHeight(offset?: number): void;
    /**
     * Add a new item to the grid
     * @param { any[] } data Data to add to the grid
     * @param { number | null } index Position of the new item
     */
    add(data: T[], index?: number): void;
    /**
     * Add an array to the grid
     * @param { any[] } data Data to add to the grid
     */
    batchAdd(data: T[]): void;
    /**
     * To update an existing item in the grid
     */
    update(data: T): void;
    /**
     * To update an array of existing items in the grid
     */
    batchUpdate(data: T[]): void;
    /**
     * To delete an existing item from the grid
     */
    delete(data: T[], id?: string): void;
    /**
     * To delete an array of existing items from the grid
     */
    batchDelete(data: T[], id?: string): void;
    /**
     * Return selected items from the grid
     */
    selected(): T[];
    /**
     * Refresh the grid
     */
    refresh(data: T[]): void;
    getRows(): any[];
    showColumns(args: any[]): void;
    hideColumns(args: string | any[]): void;
    persistState(): void;
    /**
     * Saves the changes to datasource and ends the grid edit mode
     * Applicable for grid in batch edit mode
     */
    save(): void;
    /**
     * Syncfusion Event
     *
     * @param { RecordDoubleClickEventArgs } args
     */
    recordDoubleClick(args: RecordDoubleClickEventArgs): void;
    /**
     * Hook for Syncfusion's recordDoubleClick event
     */
    protected onDoubleClick<T>(row: T): T;
    /**
     * Increase the length of the grid filter
     * @param { any } args Args on the ActionBegin event
     * @param { number } length Number of rows to include, or all rows if not specified
     */
    setFilterLength(args: any, length?: number): void;
    isFiltered(): boolean;
    showSpinner(): void;
    hideSpinner(): void;
    onLoad(): Promise<void>;
    /**
     * Return grid's persisted state
     * @protected
     */
    getLayout(): string;
    /**
     * Set the grid state
     * @protected
     */
    protected setLayout(config: {
        columns: any[];
        filterSettings: any;
    }): void;
    /**
     * Refreshes the grid with the stored layout on the server
     */
    applyLayout(layout: any): Promise<void>;
    onLayoutApplied(_layout: any): Promise<void>;
}
