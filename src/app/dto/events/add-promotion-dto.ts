export class AddPromotionDto {
  public value: number;
  public endDate: Date;

  constructor(value: number, endDate: Date) {
    this.value = value;
    this.endDate = endDate;
  }
}
