import {TicketDetailsDto} from "../tickets/ticket-details-dto";

export class OrderProfileDetails {
  public id: number;
  public status: string;
  public eventName: string;
  public orderDate: Date;
  public total: number;
  public tickets: TicketDetailsDto[];


  constructor(id: number, status: string, eventName: string, orderDate: Date, total: number, tickets: TicketDetailsDto[]) {
    this.id = id;
    this.status = status;
    this.eventName = eventName;
    this.orderDate = orderDate;
    this.total = total;
    this.tickets = tickets;
  }
}
