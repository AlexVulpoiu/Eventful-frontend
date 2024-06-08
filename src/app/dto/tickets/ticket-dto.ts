export class TicketDto {
  public externalId: string;
  public eventId: number;
  public eventName: string;
  public startDate: Date;
  public locationAddress: string;
  public validated: boolean;
  public category: string;
  public row: number;
  public seat: number;


  constructor(externalId: string, eventId: number, eventName: string, startDate: Date, locationAddress: string, validated: boolean, category: string, row: number, seat: number) {
    this.externalId = externalId;
    this.eventId = eventId;
    this.eventName = eventName;
    this.startDate = startDate;
    this.locationAddress = locationAddress;
    this.validated = validated;
    this.category = category;
    this.row = row;
    this.seat = seat;
  }
}
