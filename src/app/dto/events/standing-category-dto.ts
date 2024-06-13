export class StandingCategoryDto {
  public name: string;
  public price: number;
  public initialPrice: number;
  public ticketsRemaining: number;


  constructor(name: string, price: number, initialPrice: number, ticketsRemaining: number) {
    this.name = name;
    this.price = price;
    this.initialPrice = initialPrice;
    this.ticketsRemaining = ticketsRemaining;
  }
}
