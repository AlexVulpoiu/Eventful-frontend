export class StandingCategoryDto {
  public name: string;
  public price: number;
  public ticketsRemaining: number;


  constructor(name: string, price: number, ticketsRemaining: number) {
    this.name = name;
    this.price = price;
    this.ticketsRemaining = ticketsRemaining;
  }
}
