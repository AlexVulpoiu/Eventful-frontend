export class OrderDto {
  public id: number;
  public externalId: string;
  public orderDate: Date;
  public total: number;


  constructor(id: number, externalId: string, orderDate: Date, total: number) {
    this.id = id;
    this.externalId = externalId;
    this.orderDate = orderDate;
    this.total = total;
  }
}
