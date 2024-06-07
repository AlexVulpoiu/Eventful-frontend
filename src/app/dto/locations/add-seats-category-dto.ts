export class AddSeatCategoryDto {
  public name: string;
  public minRow: number;
  public maxRow: number;
  public minSeat: number;
  public maxSeat: number;


  constructor(name: string, minRow: number, maxRow: number, minSeat: number, maxSeat: number) {
    this.name = name;
    this.minRow = minRow;
    this.maxRow = maxRow;
    this.minSeat = minSeat;
    this.maxSeat = maxSeat;
  }
}
