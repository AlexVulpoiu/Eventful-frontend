import {StandingCategoryDto} from "../events/standing-category-dto";
import {EventDto} from "../events/event-dto";

export class OrderDetails {
  public event: EventDto | undefined;
  public standingCategories: StandingCategoryDto[];
  public ticketsPerCategory: number[];
  public total: number;

  constructor(event: EventDto | undefined, standingCategories: StandingCategoryDto[], ticketsPerCategory: number[], total: number) {
    this.event = event;
    this.standingCategories = standingCategories;
    this.ticketsPerCategory = ticketsPerCategory;
    this.total = total;
  }
}
