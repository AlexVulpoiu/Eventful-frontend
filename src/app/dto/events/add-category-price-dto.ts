export class AddCategoryPriceDto {
  public categoryId: number;
  public price: number;

  constructor(categoryId: number, price: number) {
    this.categoryId = categoryId;
    this.price = price;
  }
}
