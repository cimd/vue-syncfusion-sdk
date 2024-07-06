import { Api, IApiResponse } from '@konnec/vue-eloquent'
import { onBeforeUnmount, reactive } from 'vue'
import { IKanbanBoard } from 'modules/Sel/models/KanbanBoard/KanbanBoardInterface'
import { IKanbanStation } from 'modules/Sel/models/KanbanStation/KanbanStationInterface'
import { IKanbanCardView } from 'modules/Sel/models/KanbanCard/KanbanCardInterface'
import { getKanbanStation } from 'modules/Sel/actions/GetKanbanStation'
import { useAuthStore } from 'modules/Application/stores/Auth'
import KanbanCardApi from 'modules/Sel/models/KanbanCard/KanbanCardApi'
import GridTable from '../../database/GridTable'
import { Query } from '@syncfusion/ej2-data'
import * as Sentry from '@sentry/vue'
import * as pkg from '../../../../package.json'

export default class Kanban {
  data = reactive<IKanbanCardView[]>([])
  stations = reactive<IKanbanStation[]>([])
  selectedCard = reactive<IKanbanCardView>({
    location_id: 0,
    sel_id: 0,
    assigned_id: null,
    assigned_to: null,
    station_id: 0,
    station_name: '',
    station_started_at: '',
    updated_by: '',
    mps_view: null,
    assigned_department_id: null
  })
  declare public api: Api
  /**
   * Kanban Component query parameters
   */
  searchQuery = {
    user: null as null | number,
    param: null as null | string
  }

  id = '' as string
  componentType = 'kanban'
  $kanban = undefined as any | undefined
  protected isInitialized = false
  $dataSource = reactive<any[]>([])

  /**
   * Grid persistence stage version
   */
  stateVersion = 1

  constructor()
  {
    super()

    Sentry.setContext('class', {
      name: 'Collection',
    })
  }

  /**
   * To initialize the grid after mounted hook
   *
   */
  init()
  {
    if (this.id === '') {
      throw new Error('Kanban ID is required. Did you forget to register it?')
    }

    this.$kanban = document.getElementById(this.id)?.ej2_instances[ 0 ]
    if (this.$kanban === undefined) {
      throw new Error('Kanban Component could not be found')
    }
    this.$kanban.query = new Query()
    this.isInitialized = true

    onBeforeUnmount(async () => {
      const state = this.$kanban.getPersistData()
      GridTable.update({
        id: this.id,
        data: JSON.parse(state),
        updated_at: new Date(),
        type: 'kanban',
        version: this.stateVersion,
      })

      this.isInitialized = false
    })
  }

  /**
   * To refresh the datasource
   *
   * @param { any[] } data Args to be added to the datasource
   */
  protected initRefresh(data: any[])
  {
    if(this.isInitialized) {
      this.$kanban.dataSource = [...data]
    }
  }

  /**
   * Updates Kanban cards and stations
   *
   */
  updateBoard(data: IKanbanBoard)
  {
    this.deleteColumns()
    Object.assign(this.stations, data.stations)
    super.updateDataSource(data.cards_view)
    this.createStations()
  }

  /**
   * Add a new item to the kanban
   *
   * @param { T|T[] } data Data to add to the kanban
   * @param { number | null } index Position of the new item
   */
  add<T>(data: T|T[], index: number | null = null)
  {
    Sentry.setContext('Kanban', {
      method: 'add',
      card: data,
      stations: this.stations
    })
    this.$kanban.addCard(data, index)
  }

  /**
   * To update an existing item in the kanban
   *
   * @param { T|T[] } data Data to add to the kanban
   */
  update<T>(data: T|T[], analyticsObject: any): void
  {
    try {
      this.$kanban.updateCard(data)
    } catch (err) {
      Sentry.setContext('Kanban', {
        method: 'update',
        card: data,
        stations: this.stations,
        syncfusionKanbanLibVersion: pkg?.dependencies[ '@syncfusion/ej2-vue-kanban' ],
        updatedFrom: analyticsObject.updatedFrom,
        debugData: analyticsObject.debugData
      })
      Sentry.captureException(err)
    }
  }

  /**
   * To delete an existing item from the kanban
   *
   * @param { T|T[] } data Data to add to the kanban
   */
  delete<T>(data: T|T[])
  {
    Sentry.setContext('Kanban', {
      method: 'delete',
      card: data,
      stations: this.stations
    })
    this.$kanban.deleteCard(data)
    this.clearSelectedCard()
  }

  /**
   * To delete all the columns from the board
   */
  deleteColumns()
  {
    const currentColumns = this.$kanban.layoutModule.columnKeys
    currentColumns.forEach((key: string) => {
      this.$kanban.deleteColumn(key)
    })
  }

  /**
   * To create the stations on the board, based on the stations data
   */
  createStations()
  {
    let index = 0
    this.stations.forEach((element) => {
      this.$kanban.addColumn({
        allowToggle: true,
        headerText: element.name,
        keyField: element.name,
        template: 'headerSlot',
        showItemCount: true,
        showAddButton: false,
        data: element,
        // minCount: 2,
        // maxCount: 6,
      }, index)
      index++
    })
  }

  /**
   * Verify if the Kanban has the given station ID
   *
   * @param { number } stationId Station ID to verify
   */
  hasStation(stationId: number): boolean {
    const station = this.stations.find(el => el.id === stationId)

    return !!station
  }

  /**
   * Set the selectedCard parameter based on provided argument
   *
   * @param { IKanbanCardView } card
   * @return { IKanbanCardView } The selected card
   */
  setSelectedCard(card: IKanbanCardView): IKanbanCardView
  {
    return Object.assign(this.selectedCard, card)
  }

  /**
   * Clear the selectedCard parameter
   *
   */
  clearSelectedCard(): void
  {
    for (const key in this.selectedCard) delete this.selectedCard[ key ]
    // console.log('Cleared:', this.selectedCard)
  }

  /**
   * To update the selectedCard
   *
   * @param { IKanbanCardView } card
   * @return { IKanbanCardView } The clicked card
   */
  cardClick(card: IKanbanCardView): IKanbanCardView
  {
    // No card is currently selected
    if (this.selectedCard.id === undefined) {
      this.setSelectedCard(card)
      // console.log('New Card Selected: ID ', this.selectedCard.id)
      return this.selectedCard
    }

    // Different card selected
    if (this.selectedCard.id !== card.id) {
      this.setSelectedCard(card)
      // console.log('Replaced Card Selection: ID ', this.selectedCard.id)
      return this.selectedCard
    }

    // Deselecting the card
    // console.log('Deselecting Card')
    this.clearSelectedCard()
    return this.selectedCard
  }

  /**
   * To update the selectedCard based on right click
   *
   * @param { any } e
   * @return { IKanbanCardView } The clicked card
   */
  cardRightClicked(e: any): IKanbanCardView
  {
    const card = this.$kanban.getCardDetails(e.target.closest('.e-card'))
    this.setSelectedCard(card)
    return this.selectedCard
  }

  /**
   * On drag stop, it updates the KanbanCard API, and then the selected card on the Kanban
   *
   * @param { IKanbanCardView } card
   * @return { Promise<IKanbanCardView> }
   */
  async dropped(card: IKanbanCardView, debugData: any[]): Promise<IKanbanCardView>
  {
    const params = {
      id: card.id,
      station_id: getKanbanStation(this.stations, card.station_name)?.id,
      updated_by: useAuthStore().user.username,
      updated_from: 'Kanban.ts-dropped',
      debug_data: JSON.stringify(debugData)
    }

    const response : IApiResponse<any> = await KanbanCardApi.update(params)
    this.update(response.data, { updatedFrom: 'Kanban.ts-dropped' })

    return response.data
  }

  search(query: string): void {
    this.searchQuery.param = query
    this.updateSearchQuery()
  }

  protected updateSearchQuery(): void
  {
    const query = new Query()

    if (this.searchQuery.user) {
      query.search(
        this.searchQuery.user,
        'assigned_id',
        'equal'
      )
    }

    if (this.searchQuery.param) {
      query.search(
        this.searchQuery.param,
        [
          'id',
          'mps_view.sep_id',
          'mps_view.sel_header_id',
          'mps_view.pn',
          'mps_view.description',
          'mps_view.service_order',
          'mps_view.equipment',
          'mps_view.sel_header_id',
          'mps_view.scope',
          'mps_view.comments',
          'mps_view.work_instruction',
          'assigned_to',
        ],
        'contains',
        true
      )
    }
    this.$kanban.query = query
  }

  protected removeSearchQuery(): void
  {
    this.$kanban.query = new Query()
  }

  protected broadcastCreated(e: any): void
  {
    console.log(e)
    // this.api.show(e.id).then((response: { data: any }) => {
    //   this.add(response.data)
    // })
  }
  protected broadcastUpdated(e: any): void
  {
    console.log(e)
    // this.api.show(e.id).then((response: { data: any }) => {
    //   this.update(response.data)
    // })
  }
  protected broadcastDeleted(e: any): void
  {
    console.log(e)
    // this.delete(e.id)
  }
}
