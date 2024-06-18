export class FeedbackDto {
  public text: string;
  public user: string;
  public dateTime: Date;


  constructor(text: string, user: string, dateTime: Date) {
    this.text = text;
    this.user = user;
    this.dateTime = dateTime;
  }
}
