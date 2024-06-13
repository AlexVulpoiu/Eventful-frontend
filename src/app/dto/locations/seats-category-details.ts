export class SeatsCategoryDetails {
  public id: number;
  public name: string;
  public price: number;
  public initialPrice: number;
  public minRow: number;
  public maxRow: number;
  public minSeat: number;
  public maxSeat: number;

  constructor(id: number, name: string, minRow: number, maxRow: number, minSeat: number, maxSeat: number, price: number, initialPrice: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.initialPrice = initialPrice;
    this.minRow = minRow;
    this.maxRow = maxRow;
    this.minSeat = minSeat;
    this.maxSeat = maxSeat;
  }
}
