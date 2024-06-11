export class AddStandingCategoryDto {
  public name: string;
  public capacity: number;
  public price: number;

  constructor(name: string, capacity: number, price: number) {
    this.name = name;
    this.capacity = capacity;
    this.price = price;
  }
}
