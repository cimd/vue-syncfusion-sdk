import { reactive } from 'vue'
import { Query } from '@syncfusion/ej2-data'
import SyncfusionComponent from '@/Components/SyncfusionComponent'
import { KanbanComponent } from '@syncfusion/ej2-vue-kanban'

export default abstract class Kanban<Card, Station> implements SyncfusionComponent {
  data = reactive<Card[]>([])
  stations = reactive<Station[]>([])
  selectedCard = reactive<Card>({ })
  /**
   * Kanban Component query parameters
   */
  searchQuery = {
    user: null as null | number,
    param: null as null | string
  }

  id: string
  $component = undefined as KanbanComponent | undefined
  protected isInitialized = false

  /**
   * Grid persistence stage version
   */
  stateVersion = 0

  protected constructor(config: { id: string, stateVersion: number })
  {
    if (!config.id) {
      throw new Error('Component ID is required')
    }

    this.id = config.id
    if (config.stateVersion) { this.stateVersion = config.stateVersion }
  }

  /**
   * To initialize the grid after mounted hook
   *
   */
  init()
  {
    this.$component = document.getElementById(this.id)?.ej2_instances[ 0 ]
    if (this.$component === undefined) {
      throw new Error('Kanban Component could not be found')
    }
    this.$component.query = new Query()
    this.isInitialized = true

    this.onInit()
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
  updateBoard(stations: Station[], cards: Card[])
  {
    this.deleteColumns()
    Object.assign(this.stations, stations)
    super.updateDataSource(cards)
    this.createStations()
  }

  /**
   * Add a new item to the kanban
   *
   * @param { T|T[] } data Data to add to the kanban
   * @param { number | null } index Position of the new item
   */
  add(data: Card|Card[], index: number | null = null)
  {
    this.$component.addCard(data, index)
  }

  /**
   * To update an existing item in the kanban
   *
   * @param { T|T[] } data Data to add to the kanban
   */
  update(data: Card|Card[]): void
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
  delete(data: Card|Card[])
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
  setSelectedCard(card: Card): Card
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
  }

  /**
   * To update the selectedCard
   *
   * @param { IKanbanCardView } card
   * @return { IKanbanCardView } The clicked card
   */
  cardClick(card: Card): Card
  {
    // No card is currently selected
    if (this.selectedCard.id === undefined) {
      this.setSelectedCard(card)
      return this.selectedCard
    }

    // Different card selected
    if (this.selectedCard.id !== card.id) {
      this.setSelectedCard(card)
      return this.selectedCard
    }

    // Deselecting the card
    this.clearSelectedCard()
    return this.selectedCard
  }

  /**
   * To update the selectedCard based on right click
   *
   * @param { any } e
   * @return { IKanbanCardView } The clicked card
   */
  cardRightClicked(e: any): Card
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
  async dropped(card: Card): Promise<Card>
  {
    const response = await this.onDropped(card)

    this.update(response.data)

    return response.data
  }

  async onDropped(card: Card)

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
