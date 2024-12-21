import { default as SyncfusionComponent } from '../Components/SyncfusionComponent';
import { KanbanComponent } from '@syncfusion/ej2-vue-kanban';
export default abstract class Kanban<Card, Station> implements SyncfusionComponent {
    data: import('vue').Reactive<Card[]>;
    stations: import('vue').Reactive<Station[]>;
    selectedCard: import('vue').Reactive<Card>;
    /**
     * Kanban Component query parameters
     */
    searchQuery: {
        user: null | number;
        param: null | string;
    };
    id: string;
    $component: KanbanComponent | undefined;
    protected isInitialized: boolean;
    /**
     * Grid persistence stage version
     */
    stateVersion: number;
    protected constructor(config: {
        id: string;
        stateVersion: number;
    });
    /**
     * To initialize the grid after mounted hook
     *
     */
    init(): void;
    protected onInit(): void;
    /**
     * To refresh the datasource
     *
     * @param { any[] } data Args to be added to the datasource
     */
    protected initRefresh(data: any[]): void;
    /**
     * Updates Kanban cards and stations
     *
     */
    updateBoard(stations: Station[], cards: Card[]): void;
    /**
     * Add a new item to the kanban
     *
     * @param { T|T[] } data Data to add to the kanban
     * @param { number | null } index Position of the new item
     */
    add(data: Card | Card[], index?: number | null): void;
    /**
     * To update an existing item in the kanban
     *
     * @param { T|T[] } data Data to add to the kanban
     */
    update(data: Card | Card[]): void;
    /**
     * To delete an existing item from the kanban
     *
     * @param { T|T[] } data Data to add to the kanban
     */
    delete(data: Card | Card[]): void;
    /**
     * To delete all the columns from the board
     */
    deleteColumns(): void;
    /**
     * To create the stations on the board, based on the stations data
     */
    createStations(): void;
    /**
     * Verify if the Kanban has the given station ID
     *
     * @param { number } stationId Station ID to verify
     */
    hasStation(stationId: number): boolean;
    /**
     * Set the selectedCard parameter based on provided argument
     *
     * @param { IKanbanCardView } card
     * @return { IKanbanCardView } The selected card
     */
    setSelectedCard(card: Card): Card;
    /**
     * Clear the selectedCard parameter
     *
     */
    clearSelectedCard(): void;
    /**
     * To update the selectedCard
     *
     * @param { IKanbanCardView } card
     * @return { IKanbanCardView } The clicked card
     */
    cardClick(card: Card): Card;
    /**
     * To update the selectedCard based on right click
     *
     * @param { any } e
     * @return { IKanbanCardView } The clicked card
     */
    cardRightClicked(e: any): Card;
    /**
     * On drag stop, it updates the KanbanCard API, and then the selected card on the Kanban
     *
     * @param { IKanbanCardView } card
     * @return { Promise<IKanbanCardView> }
     */
    dropped(card: Card): Promise<Card>;
    onDropped(card: Card): any;
    search(query: string): void;
    protected updateSearchQuery(): void;
    protected removeSearchQuery(): void;
}
