export class OrderForEventDetails {
  public id: number;
  public orderDate: Date;
  public total: number;
  public tickets: number;


  constructor(id: number, orderDate: Date, total: number, tickets: number) {
    this.id = id;
    this.orderDate = orderDate;
    this.total = total;
    this.tickets = tickets;
  }
}
