import { default as ComponentType } from '../Sdk/ComponentType';
import { ColumnModel } from '@syncfusion/ej2-vue-grids';
export default class StatePersistance {
    type: ComponentType;
    _id: string;
    _state: any;
    protected localStorageId: string;
    constructor(type: ComponentType, id?: string);
    set state(state: string);
    get state(): string;
    set id(id: string);
    get id(): string;
    update(): Promise<void>;
    setLocalStorage(): Promise<boolean>;
    deleteLocalStorage(): void;
    addColumn(column: ColumnModel): Promise<void>;
    updateColumn(): void;
}
