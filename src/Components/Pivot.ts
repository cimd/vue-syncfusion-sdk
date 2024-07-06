import { Api } from '@konnec/vue-eloquent'
import { onBeforeUnmount, reactive } from 'vue'
import PivotToolbar from '../Enum/PivotToolbar'
import ChartType from '../Enum/ChartType'
import {
  BeginDrillThroughEventArgs,
  ChartSeriesType,
  DataSourceSettings,
  DisplayOption,
  PivotView,
} from '@syncfusion/ej2-vue-pivotview'
import {
  CalculatedFieldSettingsModel,
  FieldOptionsModel,
  FilterModel,
  FormatSettingsModel,
} from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model'
import { Filter, Grid, Sort } from '@syncfusion/ej2-vue-grids'
import GridTable from 'src/app/database/GridTable'
import ILayout from 'modules/Config/models/Layout/LayoutInterface'
import LayoutApi from 'modules/Config/models/Layout/LayoutApi'

export default class Pivot {
  /**
   * Pivot DOM id
   * @param { string } id
   */
  declare id: string
  declare api: Api
  componentType = 'pivot'

  /**
   * Sets if the Pivot has been initialized
   * @param { boolean } isInitialized
   */

  protected isInitialized = false
  /**
   * Syncfusions PivotView instance
   * @param { PivotView } $pivot
   */
  $pivot: PivotView

  /**
   * Grid persistence stage version
   */
  stateVersion = 1

  /*
  | Datasource Settings
   */
  dataSourceSettings = reactive({} as DataSourceSettings)
  data: any[] = []
  protected expandAll = true
  protected rows = [] as FieldOptionsModel[]
  protected columns = [] as FieldOptionsModel[]
  protected values = [] as FieldOptionsModel[]
  protected allowValueFilter = true
  protected filters=[] as FieldOptionsModel[]
  protected filterSettings= [] as FilterModel[]
  protected formatSettings= [] as FormatSettingsModel[]
  protected calculatedFieldSettings = [] as CalculatedFieldSettingsModel[]
  /*
  | ------------------------------------------------
   */

  /*
  | Pivot Settings
   */
  gridSettings = reactive({ columnWidth: 140 })
  toolbar = reactive([
    PivotToolbar.Grid,
    PivotToolbar.Chart,
    PivotToolbar.SubTotal,
    PivotToolbar.GrandTotal,
    PivotToolbar.Export,
    PivotToolbar.ConditionalFormatting,
    PivotToolbar.NumberFormatting,
    PivotToolbar.FieldList
  ])
  displayOption = reactive({
    primary: 'Chart',
    view: 'Both'
  } as DisplayOption)
  chartTypes = reactive([
    ChartType.StackingColumn,
    ChartType.Column,
    ChartType.Bar,
    ChartType.Line,
    ChartType.Area
  ] as ChartSeriesType[])
  chartSettings = reactive({
    enableMultipleAxis: true,
    chartSeries: { type: ChartType.Column },
    zoomSettings: {
      enableScrollbar: false,
      toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
    }
  })
  /*
  | ------------------------------------------------
   */

  constructor()
  {
    super()
    this.$pivot = new PivotView({})
  }

  /**
   * Setup the default options for the Pivot
   *
   * @return void
   */
  protected setup()
  {
    this.dataSourceSettings.dataSource = this.data
    this.dataSourceSettings.expandAll = this.expandAll
    this.dataSourceSettings.rows = this.rows
    this.dataSourceSettings.columns = this.columns
    this.dataSourceSettings.values = this.values
    this.dataSourceSettings.allowValueFilter = this.allowValueFilter
    this.dataSourceSettings.filters = this.filters
    this.dataSourceSettings.filterSettings = this.filterSettings
    this.dataSourceSettings.formatSettings = this.formatSettings
    this.dataSourceSettings.calculatedFieldSettings = this.calculatedFieldSettings
  }

  /**
   * Initializes the Pivot.
   * To be called on mounted hook
   *
   * @return void
   */
  init()
  {
    if (this.id === '') {
      throw new Error('Pivot ID is required')
    }

    this.$pivot = document.getElementById(this.id)?.ej2_instances[ 0 ]
    if (this.$pivot === undefined) {
      throw new Error('Pivot Component could not be found')
    }

    this.$pivot.enableFieldSearching = true
    this.isInitialized = true

    onBeforeUnmount(async () => {
      const state = this.$pivot.getPersistData()
      GridTable.update({
        id: this.id,
        data: JSON.parse(state),
        updated_at: new Date(),
        type: 'pivot',
        version: this.stateVersion,
      })

      this.isInitialized = false
    })
  }

  /**
   * To update the Pivot DataSource
   *
   * @param { T[] } data DataSource
   * @return void
   */
  update<T>(data: T[])
  {
    this.$pivot.dataSourceSettings.dataSource = [...data]
  }

  /**
   * Triggers after clicking/double-clicking on a pivot field.
   *
   * @param { BeginDrillThroughEventArgs } args Syncfusion BeginDrillThroughEventArgs
   * @return void
   */
  beginDrillThrough(args: BeginDrillThroughEventArgs)
  {
    // Setup DrillThrough Grid
    if (args.gridObj) {
      Grid.Inject(Sort, Filter)
      args.gridObj.allowExcelExport = true
      args.gridObj.allowSorting = true
      args.gridObj.allowFiltering = true
      args.gridObj.filterSettings = { type: 'Excel' }
      args.gridObj.toolbar = ['ExcelExport', 'ColumnChooser']
      args.gridObj.toolbarClick = (args) => {
        if (args.item.properties.text === 'Excel Export') {
          const grid = document?.getElementById(this.id)?.ej2_instances[ 0 ].drillThroughModule.drillThroughDialog.drillThroughGrid
          grid.excelExport()
        }
      }
    }
  }

  /**
   * Refresh the pivot
   */
  refresh()
  {
    if (!this.isInitialized) return

    this.$pivot.refresh()
  }


  /**
   * Return pivot's persisted state
   * @protected
   */
  getLayout(): string
  {
    const json = JSON.parse(this.$pivot.getPersistData())
    return JSON.stringify(json)
  }

  /**
   * Set the pivot state
   * @protected
   */
  protected setLayout(config: any): void
  {
    this.$pivot.loadPersistData(JSON.stringify(config))
  }

  /**
   * Refreshes the grid with the stored layout on the server
   */
  async applyLayout(layout: ILayout)
  {
    this.setLayout(layout.settings)

    await LayoutApi.select(<number>layout.id)

    const el = document.getElementById('applied-layout-name')
    if (el !== null) {
      el.value = layout.name
    }
  }
}
