export class ReviewDetailsDto {
  public text: string;
  public dateTime: Date;

  constructor(text: string, dateTime: Date) {
    this.text = text;
    this.dateTime = dateTime;
  }
}
