import {OrderForEventDetails} from "./order-for-event-details-dto";

export class EventOrderDto {
  public totalAmount: number;
  public charitableEvent: boolean;
  public charityAmount: number;
  public orders: OrderForEventDetails[];


  constructor(totalAmount: number, charitableEvent: boolean, charityAmount: number, orders: OrderForEventDetails[]) {
    this.totalAmount = totalAmount;
    this.charitableEvent = charitableEvent;
    this.charityAmount = charityAmount;
    this.orders = orders;
  }
}
