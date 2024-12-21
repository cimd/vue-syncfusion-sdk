import { default as PivotToolbar } from '../Enum/PivotToolbar';
import { default as ChartType } from '../Enum/ChartType';
import { BeginDrillThroughEventArgs, ChartSeriesType, PivotView } from '@syncfusion/ej2-vue-pivotview';
import { CalculatedFieldSettingsModel, FieldOptionsModel, FilterModel, FormatSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { default as SyncfusionComponent } from './SyncfusionComponent';
export default abstract class Pivot<T> implements SyncfusionComponent {
    /**
     * Pivot DOM id
     * @param { string } id
     */
    id: string;
    componentType: string;
    /**
     * Sets if the Pivot has been initialized
     * @param { boolean } isInitialized
     */
    protected isInitialized: boolean;
    /**
     * Syncfusions PivotView instance
     * @param { PivotView } $component
     */
    $component: PivotView;
    /**
     * Grid persistence stage version
     */
    stateVersion: number;
    dataSourceSettings: {
        mode: import('@syncfusion/ej2-pivotview').RenderMode;
        catalog: string;
        cube: string;
        roles: string;
        providerType: import('@syncfusion/ej2-pivotview').ProviderType;
        url: string;
        localeIdentifier: number;
        dataSource: import('@syncfusion/ej2-pivotview').IDataSet[] | string[][] | {
            adaptor: {
                processQuery?: Function;
                processResponse?: Function;
                beforeSend?: Function;
                batchRequest?: Function;
                insert?: Function;
                remove?: Function;
                update?: Function;
                key?: string;
            };
            defaultQuery: {
                queries: {
                    fn?: string;
                    e?: /*elided*/ any;
                    fieldNames?: string | string[];
                    operator?: string;
                    searchKey?: string | number | boolean;
                    ignoreCase?: boolean;
                    ignoreAccent?: boolean;
                    comparer?: string | Function;
                    format?: string | {
                        minimumFractionDigits?: number;
                        maximumFractionDigits?: number;
                        minimumSignificantDigits?: number;
                        maximumSignificantDigits?: number;
                        useGrouping?: boolean;
                        ignoreCurrency?: boolean;
                        skeleton?: string;
                        currency?: string;
                        minimumIntegerDigits?: number;
                        format?: string;
                        altSymbol?: string;
                    } | {
                        skeleton?: string;
                        type?: string;
                        format?: string;
                        calendar?: string;
                        isServerRendered?: boolean;
                    };
                    direction?: string;
                    pageIndex?: number;
                    pageSize?: number;
                    start?: number;
                    end?: number;
                    nos?: number;
                    field?: string;
                    fieldName?: string;
                    type?: Object;
                    name?: string | string[];
                    filter?: Object;
                    key?: string;
                    value?: string | number | boolean | Date | {
                        [x: string]: string | number | boolean | Function | Date | /*elided*/ any | /*elided*/ any[] | null;
                        field: string;
                        operator: string;
                        value: string | number | boolean | Date | /*elided*/ any | /*elided*/ any[] | null;
                        condition: string;
                        ignoreCase: boolean;
                        matchCase: boolean;
                        ignoreAccent: boolean;
                        isComplex: boolean;
                        predicates: /*elided*/ any[];
                        comparer: Function;
                        and: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        or: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        ornot: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        andnot: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        validate: (record: Object) => boolean;
                        toJson: () => Object;
                    } | {
                        [x: string]: string | number | boolean | Function | Date | /*elided*/ any | /*elided*/ any[] | null;
                        field: string;
                        operator: string;
                        value: string | number | boolean | Date | /*elided*/ any | /*elided*/ any[] | null;
                        condition: string;
                        ignoreCase: boolean;
                        matchCase: boolean;
                        ignoreAccent: boolean;
                        isComplex: boolean;
                        predicates: /*elided*/ any[];
                        comparer: Function;
                        and: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        or: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        ornot: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        andnot: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        validate: (record: Object) => boolean;
                        toJson: () => Object;
                    }[];
                    isComplex?: boolean;
                    predicates?: {
                        [x: string]: string | number | boolean | Function | Date | /*elided*/ any | /*elided*/ any[] | null;
                        field: string;
                        operator: string;
                        value: string | number | boolean | Date | /*elided*/ any | /*elided*/ any[] | null;
                        condition: string;
                        ignoreCase: boolean;
                        matchCase: boolean;
                        ignoreAccent: boolean;
                        isComplex: boolean;
                        predicates: /*elided*/ any[];
                        comparer: Function;
                        and: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        or: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        ornot: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        andnot: (field: string | import('@syncfusion/ej2-data').Predicate, operator?: string, value?: string | number | Date | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Predicate;
                        validate: (record: Object) => boolean;
                        toJson: () => Object;
                    }[];
                    condition?: string;
                }[];
                key: string;
                fKey: string;
                fromTable: string;
                lookups: string[];
                expands: Object[];
                sortedColumns: Object[];
                groupedColumns: Object[];
                subQuerySelector: Function;
                subQuery: /*elided*/ any;
                isChild: boolean;
                params: {
                    key: string;
                    value?: string | null;
                    fn?: Function;
                }[];
                lazyLoad: {
                    key: string;
                    value: object | boolean;
                }[];
                isCountRequired: boolean;
                dataManager: /*elided*/ any;
                distincts: string[];
                readonly moduleName: string;
                setKey: (field: string) => import('@syncfusion/ej2-data').Query;
                using: (dataManager: import('@syncfusion/ej2-data').DataManager) => import('@syncfusion/ej2-data').Query;
                execute: (dataManager?: import('@syncfusion/ej2-data').DataManager, done?: Function, fail?: Function, always?: Function) => Promise<Object>;
                executeLocal: (dataManager?: import('@syncfusion/ej2-data').DataManager) => Object[];
                clone: () => import('@syncfusion/ej2-data').Query;
                from: (tableName: string) => import('@syncfusion/ej2-data').Query;
                addParams: (key: string, value: Function | string | null) => import('@syncfusion/ej2-data').Query;
                distinct: (fields: string | string[]) => import('@syncfusion/ej2-data').Query;
                expand: (tables: string | Object[]) => import('@syncfusion/ej2-data').Query;
                where: (fieldName: string | import('@syncfusion/ej2-data').Predicate | import('@syncfusion/ej2-data').Predicate[], operator?: string, value?: string | Date | number | boolean | null, ignoreCase?: boolean, ignoreAccent?: boolean, matchCase?: boolean) => import('@syncfusion/ej2-data').Query;
                search: (searchKey: string | number | boolean, fieldNames?: string | string[], operator?: string, ignoreCase?: boolean, ignoreAccent?: boolean) => import('@syncfusion/ej2-data').Query;
                sortBy: (fieldName: string | string[], comparer?: string | Function, isFromGroup?: boolean) => import('@syncfusion/ej2-data').Query;
                sortByForeignKey: (fieldName: string | string[], comparer?: string | Function, isFromGroup?: boolean, direction?: string) => import('@syncfusion/ej2-data').Query;
                sortByDesc: (fieldName: string) => import('@syncfusion/ej2-data').Query;
                group: (fieldName: string, fn?: Function, format?: string | import('@syncfusion/ej2-base').NumberFormatOptions | import('@syncfusion/ej2-base').DateFormatOptions) => import('@syncfusion/ej2-data').Query;
                page: (pageIndex: number, pageSize: number) => import('@syncfusion/ej2-data').Query;
                range: (start: number, end: number) => import('@syncfusion/ej2-data').Query;
                take: (nos: number) => import('@syncfusion/ej2-data').Query;
                skip: (nos: number) => import('@syncfusion/ej2-data').Query;
                select: (fieldNames: string | string[]) => import('@syncfusion/ej2-data').Query;
                hierarchy: (query: import('@syncfusion/ej2-data').Query, selectorFn: Function) => import('@syncfusion/ej2-data').Query;
                foreignKey: (key: string) => import('@syncfusion/ej2-data').Query;
                requiresCount: () => import('@syncfusion/ej2-data').Query;
                aggregate: (type: string, field: string) => import('@syncfusion/ej2-data').Query;
            };
            dataSource: {
                url?: string;
                adaptor?: {
                    processQuery?: Function;
                    processResponse?: Function;
                    beforeSend?: Function;
                    batchRequest?: Function;
                    insert?: Function;
                    remove?: Function;
                    update?: Function;
                    key?: string;
                };
                insertUrl?: string;
                removeUrl?: string;
                updateUrl?: string;
                crudUrl?: string;
                batchUrl?: string;
                json?: Object[];
                headers?: Object[];
                accept?: boolean;
                data?: {
                    parse: (text: string, reviver?: (this: any, key: string, value: any) => any) => any;
                    stringify: {
                        (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
                        (value: any, replacer?: (number | string)[] | null, space?: string | number): string;
                    };
                    readonly [Symbol.toStringTag]: string;
                };
                timeTillExpiration?: number;
                cachingPageSize?: number;
                enableCaching?: boolean;
                requestType?: string;
                key?: string;
                crossDomain?: boolean;
                jsonp?: string;
                dataType?: string;
                offline?: boolean;
                requiresFormat?: boolean;
                timeZoneHandling?: boolean;
                id?: string;
                enablePersistence?: boolean;
                ignoreOnPersist?: string[];
            };
            dateParse: boolean;
            timeZoneHandling: boolean;
            ready: {
                then: <TResult1 = Response, TResult2 = never>(onfulfilled?: ((value: Response) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
                catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<Response | TResult>;
                finally: (onfinally?: (() => void) | null | undefined) => Promise<Response>;
                readonly [Symbol.toStringTag]: string;
            };
            readonly moduleName: string;
            getPersistedData: (id?: string) => object;
            setPersistData: (e: Event, id?: string, persistData?: object) => void;
            setDefaultQuery: (query: import('@syncfusion/ej2-data').Query) => import('@syncfusion/ej2-data').DataManager;
            executeLocal: (query?: import('@syncfusion/ej2-data').Query) => Object[];
            executeQuery: (query: import('@syncfusion/ej2-data').Query | Function, done?: Function, fail?: Function, always?: Function) => Promise<Response>;
            saveChanges: (changes: Object, key?: string, tableName?: string | import('@syncfusion/ej2-data').Query, query?: import('@syncfusion/ej2-data').Query, original?: Object) => Promise<Object> | Object;
            insert: (data: Object, tableName?: string | import('@syncfusion/ej2-data').Query, query?: import('@syncfusion/ej2-data').Query, position?: number) => Object | Promise<Object>;
            remove: (keyField: string, value: Object, tableName?: string | import('@syncfusion/ej2-data').Query, query?: import('@syncfusion/ej2-data').Query) => Object | Promise<Object>;
            update: (keyField: string, value: Object, tableName?: string | import('@syncfusion/ej2-data').Query, query?: import('@syncfusion/ej2-data').Query, original?: Object) => Object | Promise<Object>;
            clearPersistence: () => void;
        };
        rows: {
            name?: string;
            caption?: string;
            type?: import('@syncfusion/ej2-pivotview').SummaryTypes;
            axis?: string;
            showNoDataItems?: boolean;
            baseField?: string;
            baseItem?: string;
            showSubTotals?: boolean;
            isNamedSet?: boolean;
            isCalculatedField?: boolean;
            showFilterIcon?: boolean;
            showSortIcon?: boolean;
            showRemoveIcon?: boolean;
            showValueTypeIcon?: boolean;
            showEditIcon?: boolean;
            allowDragAndDrop?: boolean;
            dataType?: string;
            expandAll?: boolean;
            groupName?: string;
        }[];
        columns: {
            name?: string;
            caption?: string;
            type?: import('@syncfusion/ej2-pivotview').SummaryTypes;
            axis?: string;
            showNoDataItems?: boolean;
            baseField?: string;
            baseItem?: string;
            showSubTotals?: boolean;
            isNamedSet?: boolean;
            isCalculatedField?: boolean;
            showFilterIcon?: boolean;
            showSortIcon?: boolean;
            showRemoveIcon?: boolean;
            showValueTypeIcon?: boolean;
            showEditIcon?: boolean;
            allowDragAndDrop?: boolean;
            dataType?: string;
            expandAll?: boolean;
            groupName?: string;
        }[];
        values: {
            name?: string;
            caption?: string;
            type?: import('@syncfusion/ej2-pivotview').SummaryTypes;
            axis?: string;
            showNoDataItems?: boolean;
            baseField?: string;
            baseItem?: string;
            showSubTotals?: boolean;
            isNamedSet?: boolean;
            isCalculatedField?: boolean;
            showFilterIcon?: boolean;
            showSortIcon?: boolean;
            showRemoveIcon?: boolean;
            showValueTypeIcon?: boolean;
            showEditIcon?: boolean;
            allowDragAndDrop?: boolean;
            dataType?: string;
            expandAll?: boolean;
            groupName?: string;
        }[];
        filters: {
            name?: string;
            caption?: string;
            type?: import('@syncfusion/ej2-pivotview').SummaryTypes;
            axis?: string;
            showNoDataItems?: boolean;
            baseField?: string;
            baseItem?: string;
            showSubTotals?: boolean;
            isNamedSet?: boolean;
            isCalculatedField?: boolean;
            showFilterIcon?: boolean;
            showSortIcon?: boolean;
            showRemoveIcon?: boolean;
            showValueTypeIcon?: boolean;
            showEditIcon?: boolean;
            allowDragAndDrop?: boolean;
            dataType?: string;
            expandAll?: boolean;
            groupName?: string;
        }[];
        fieldMapping: {
            name?: string;
            caption?: string;
            type?: import('@syncfusion/ej2-pivotview').SummaryTypes;
            axis?: string;
            showNoDataItems?: boolean;
            baseField?: string;
            baseItem?: string;
            showSubTotals?: boolean;
            isNamedSet?: boolean;
            isCalculatedField?: boolean;
            showFilterIcon?: boolean;
            showSortIcon?: boolean;
            showRemoveIcon?: boolean;
            showValueTypeIcon?: boolean;
            showEditIcon?: boolean;
            allowDragAndDrop?: boolean;
            dataType?: string;
            expandAll?: boolean;
            groupName?: string;
        }[];
        excludeFields: string[];
        expandAll: boolean;
        valueAxis: string;
        valueIndex: number;
        filterSettings: {
            name?: string;
            type?: import('@syncfusion/ej2-pivotview').FilterType;
            items?: string[];
            condition?: import('@syncfusion/ej2-pivotview').Operators;
            value1?: string | Date;
            value2?: string | Date;
            measure?: string;
            levelCount?: number;
            selectedField?: string;
        }[];
        sortSettings: {
            name?: string;
            order?: import('@syncfusion/ej2-pivotview').Sorting;
            membersOrder?: string[] | number[];
        }[];
        enableSorting: boolean;
        type: import('@syncfusion/ej2-pivotview').DataSourceType;
        allowMemberFilter: boolean;
        allowLabelFilter: boolean;
        allowValueFilter: boolean;
        showSubTotals: boolean;
        showRowSubTotals: boolean;
        showColumnSubTotals: boolean;
        subTotalsPosition: import('@syncfusion/ej2-pivotview').SubTotalsPosition;
        showGrandTotals: boolean;
        grandTotalsPosition: import('@syncfusion/ej2-pivotview').GrandTotalsPosition;
        showRowGrandTotals: boolean;
        showColumnGrandTotals: boolean;
        alwaysShowValueHeader: boolean;
        showHeaderWhenEmpty: boolean;
        showAggregationOnValueField: boolean;
        formatSettings: {
            name?: string;
            minimumFractionDigits?: number;
            maximumFractionDigits?: number;
            minimumSignificantDigits?: number;
            maximumSignificantDigits?: number;
            useGrouping?: boolean;
            skeleton?: string;
            type?: string;
            currency?: string;
            minimumIntegerDigits?: number;
            format?: string;
        }[];
        drilledMembers: {
            name?: string;
            items?: string[];
            delimiter?: string;
        }[];
        valueSortSettings: {
            headerText?: string;
            headerDelimiter?: string;
            sortOrder?: import('@syncfusion/ej2-pivotview').Sorting;
            measure?: string;
        };
        calculatedFieldSettings: {
            name?: string;
            formula?: string;
            hierarchyUniqueName?: string;
            formatString?: string;
        }[];
        conditionalFormatSettings: {
            measure?: string;
            label?: string;
            conditions?: import('@syncfusion/ej2-pivotview').Condition;
            value1?: number;
            value2?: number;
            style?: {
                backgroundColor?: string;
                color?: string;
                fontFamily?: string;
                fontSize?: string;
            };
            applyGrandTotals?: boolean;
        }[];
        emptyCellsTextContent: string;
        groupSettings: {
            name?: string;
            groupInterval?: import('@syncfusion/ej2-pivotview').DateGroup[];
            startingAt?: string | Date | number;
            endingAt?: string | Date | number;
            type?: import('@syncfusion/ej2-pivotview').GroupType;
            rangeInterval?: number;
            caption?: string;
            customGroups?: {
                groupName?: string;
                items?: string[];
            }[];
        }[];
        authentication: {
            userName?: string;
            password?: string;
        };
    };
    data: T[];
    protected expandAll: boolean;
    protected rows: FieldOptionsModel[];
    protected columns: FieldOptionsModel[];
    protected values: FieldOptionsModel[];
    protected allowValueFilter: boolean;
    protected filters: FieldOptionsModel[];
    protected filterSettings: FilterModel[];
    protected formatSettings: FormatSettingsModel[];
    protected calculatedFieldSettings: CalculatedFieldSettingsModel[];
    gridSettings: {
        columnWidth: number;
    };
    toolbar: import('vue').Reactive<PivotToolbar[]>;
    displayOption: {
        view: import('@syncfusion/ej2-pivotview').View;
        primary: import('@syncfusion/ej2-pivotview').Primary;
    };
    chartTypes: import('vue').Reactive<ChartSeriesType[]>;
    chartSettings: {
        enableMultipleAxis: boolean;
        chartSeries: {
            type: ChartType;
        };
        zoomSettings: {
            enableScrollbar: boolean;
            toolbarItems: string[];
        };
    };
    protected constructor(config: {
        id: string;
        stateVersion: number;
    });
    /**
     * Setup the default options for the Pivot
     *
     * @return void
     */
    protected setup(): void;
    /**
     * Initializes the Pivot.
     * To be called on mounted hook
     *
     * @return void
     */
    init(): void;
    protected onInit(): void;
    /**
     * To update the Pivot DataSource
     *
     * @param { T[] } data DataSource
     * @return void
     */
    update<T>(data: T[]): void;
    /**
     * Triggers after clicking/double-clicking on a pivot field.
     *
     * @param { BeginDrillThroughEventArgs } args Syncfusion BeginDrillThroughEventArgs
     * @return void
     */
    beginDrillThrough(args: BeginDrillThroughEventArgs): void;
    /**
     * Refresh the pivot
     */
    refresh(): void;
    /**
     * Return pivot's persisted state
     * @protected
     */
    getLayout(): string;
    /**
     * Set the pivot state
     * @protected
     */
    protected setLayout(config: any): void;
    /**
     * Refreshes the grid with the stored layout on the server
     */
    applyLayout(layout: any): Promise<void>;
    onLayoutApplied(_layout: any): Promise<void>;
}
