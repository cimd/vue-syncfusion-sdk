import { Api, IApiResponse } from '@konnec/vue-eloquent'
import { reactive } from 'vue'
import { IKanbanBoard } from 'modules/Sel/models/KanbanBoard/KanbanBoardInterface'
import { IKanbanStation } from 'modules/Sel/models/KanbanStation/KanbanStationInterface'
import { IKanbanCardView } from 'modules/Sel/models/KanbanCard/KanbanCardInterface'
import { getKanbanStation } from 'modules/Sel/actions/GetKanbanStation'
import { useAuthStore } from 'modules/Application/stores/Auth'
import KanbanCardApi from 'modules/Sel/models/KanbanCard/KanbanCardApi'
import { Query } from '@syncfusion/ej2-data'
import StatePersistance from '@/Components/StatePersistance'

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
  persistedState: StatePersistance
  /**
   * Kanban Component query parameters
   */
  searchQuery = {
    user: null as null | number,
    param: null as null | string
  }

  id = '' as string
  componentType = 'kanban'
  $component = undefined as any | undefined
  protected isInitialized = false
  $dataSource = reactive<any[]>([])

  /**
   * Grid persistence stage version
   */
  stateVersion = 1

  constructor(id: string)
  {
    if (!id) {
      throw new Error('Component ID is required')
    }

    this.id = id
    // this.$component = new Grid()
    this.persistedState = new StatePersistance('kanban')
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

    this.$component = document.getElementById(this.id)?.ej2_instances[ 0 ]
    if (this.$component === undefined) {
      throw new Error('Kanban Component could not be found')
    }
    this.$component.query = new Query()
    this.isInitialized = true

    this.onInit()
    // onBeforeUnmount(async () => {
    //   const state = this.$component.getPersistData()
    //   GridTable.update({
    //     id: this.id,
    //     data: JSON.parse(state),
    //     updated_at: new Date(),
    //     type: 'kanban',
    //     version: this.stateVersion,
    //   })
    //
    //   this.isInitialized = false
    // })
  }

  protected onInit(): void

  /**
   * To refresh the datasource
   *
   * @param { any[] } data Args to be added to the datasource
   */
  protected initRefresh(data: any[])
  {
    if(this.isInitialized) {
      this.$component.dataSource = [...data]
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
    this.$component.addCard(data, index)
  }

  /**
   * To update an existing item in the kanban
   *
   * @param { T|T[] } data Data to add to the kanban
   */
  update<T>(data: T|T[], analyticsObject: any): void
  {
    try {
      this.$component.updateCard(data)
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * To delete an existing item from the kanban
   *
   * @param { T|T[] } data Data to add to the kanban
   */
  delete<T>(data: T|T[])
  {
    this.$component.deleteCard(data)
    this.clearSelectedCard()
  }

  /**
   * To delete all the columns from the board
   */
  deleteColumns()
  {
    const currentColumns = this.$component.layoutModule.columnKeys
    currentColumns.forEach((key: string) => {
      this.$component.deleteColumn(key)
    })
  }

  /**
   * To create the stations on the board, based on the stations data
   */
  createStations()
  {
    let index = 0
    this.stations.forEach((element) => {
      this.$component.addColumn({
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
    const card = this.$component.getCardDetails(e.target.closest('.e-card'))
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
    this.$component.query = query
  }

  protected removeSearchQuery(): void
  {
    this.$component.query = new Query()
  }
}
