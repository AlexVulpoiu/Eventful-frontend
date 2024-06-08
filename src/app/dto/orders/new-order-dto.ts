import {SeatDetails} from "./seat-details";

export class NewOrderDto {
  public eventId: number;
  public discountPoints: number;
  public standingTickets: {};
  public seatedTicketsDetails: SeatDetails[];


  constructor(eventId: number, discountPoints: number, standingTickets: {}, seatedTicketsDetails: SeatDetails[]) {
    this.eventId = eventId;
    this.discountPoints = discountPoints;
    this.standingTickets = standingTickets;
    this.seatedTicketsDetails = seatedTicketsDetails;
  }
}
