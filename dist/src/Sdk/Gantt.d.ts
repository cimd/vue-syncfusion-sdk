import { default as SyncfusionComponent } from './SyncfusionComponent';
import { Gantt as SyncfusionGantt } from '@syncfusion/ej2-gantt';
type position = 'Below' | 'Above' | 'Child';
export default abstract class Gantt<T> implements SyncfusionComponent {
    data: T[];
    id: string;
    $component: SyncfusionGantt;
    protected isInitialized: boolean;
    $dataSource: import('vue').Reactive<T[]>;
    stateVersion: number;
    protected constructor(config: {
        id: string;
        stateVersion: number;
    });
    /**
     * To initialize the grid after mounted hook
     * @param { string } id Grid ID. Will use default grid if not specified.
     */
    init(): void;
    updateDataSource(data: any[]): void;
    /**
     * Sets the grid height
     * @param { number } offset Value to offset the grid height to
     */
    $height(offset?: number): string;
    /**
     * Add a new item to the grid
     * @param { any | any[] } data Data to add to the grid
     * @param { position } position Position of the new item
     * @param { boolean } save If change should be saved to server
     */
    add(data: T | T[], position?: position, save?: boolean): Promise<void>;
    beforeAdd(data: T): Promise<any>;
    /**
     * Add an array to the grid
     * @param { any | any[] } data Data to add to the grid
     * @param { position } position Position of the new item
     * @param { boolean } save If change should be saved to server
     */
    batchAdd(data: T[], position?: position, save?: boolean): Promise<void>;
    /**
     * To update an existing item in the grid
     */
    update(data: T, save?: boolean): Promise<void>;
    beforeUpdate(data: T): Promise<any>;
    /**
     * To update an array of existing items in the grid
     * @param { any[] } data Data to add to the grid
     * @param { boolean } save If change should be saved to server
     */
    batchUpdate(data: T[], save?: boolean): Promise<any>;
    beforeBatchUpdate(data: T): Promise<any>;
    /**
     * To delete an existing item or array from the grid
     * @param { any[] } data Data to add to the grid
     * @param { boolean } save If change should be saved to server
     */
    delete(data: T[], save?: boolean): Promise<any>;
    afterDelete(data: T): Promise<any>;
    /**
     * To delete an array of existing items from the grid
     */
    batchDelete(data: any | any[], save?: boolean): Promise<any>;
    /**
     * Return selected tasks data from the grid
     */
    selected(): T[];
    /**
     * Return selected records from the grid
     */
    selectedTasks(): T[];
    /**
     * Increase the length of the grid filter
     * @param { any } args Args on the ActionBegin event
     * @param { number } length Number of rows to include, or all rows if not specified
     */
    setFilterLength(args: any, length?: number): void;
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
        sortSettings: any;
    }): void;
    /**
     * Refreshes the grid with the stored layout on the server
     */
    applyLayout(layout: any): Promise<void>;
    onLayoutApplied(layout: any): Promise<void>;
    loadLayoutFromLocalStorage(): void;
    protected getColumnsVisibility(columns: any[]): {
        visible: any[];
        hidden: any[];
    };
}
export {};
