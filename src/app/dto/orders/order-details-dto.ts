import {StandingCategoryDto} from "../events/standing-category-dto";
import {EventDto} from "../events/event-dto";
import {SeatedTicketDto} from "./seated-ticket-dto";

export class OrderDetails {
  public event: EventDto | undefined;
  public standingCategories: StandingCategoryDto[];
  public ticketsPerCategory: number[];
  public total: number;
  public seatedTickets: SeatedTicketDto[];
  public seatsCategories: string[];
  public seatsCategoriesPrices: number[];

  constructor(event: EventDto | undefined, standingCategories: StandingCategoryDto[], ticketsPerCategory: number[],
              total: number, seatedTickets: SeatedTicketDto[], seatsCategories: string[], seatsCategoriesPrices: number[]) {
    this.event = event;
    this.standingCategories = standingCategories;
    this.ticketsPerCategory = ticketsPerCategory;
    this.total = total;
    this.seatedTickets = seatedTickets;
    this.seatsCategories = seatsCategories;
    this.seatsCategoriesPrices = seatsCategoriesPrices;
  }
}
