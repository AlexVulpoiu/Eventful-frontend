export class SeatDetails {
  public categoryId: number;
  public row: number;
  public seat: number;


  constructor(categoryId: number, row: number, seat: number) {
    this.categoryId = categoryId;
    this.row = row;
    this.seat = seat;
  }
}
