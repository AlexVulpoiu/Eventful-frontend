export class SeatedTicketDto {
  public categoryId: number;
  public categoryName: string;
  public price: number;
  public row: number;
  public seat: number;

  constructor(categoryId: number, categoryName: string, price: number, row: number, seat: number) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.price = price;
    this.row = row;
    this.seat = seat;
  }
}
