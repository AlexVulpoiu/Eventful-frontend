export class RaffleDto {
  public participantsLimit: number;
  public endDate: Date;
  public prize: number;
  public partnerName: string;


  constructor(participantsLimit: number, endDate: Date, prize: number, partnerName: string) {
    this.participantsLimit = participantsLimit;
    this.endDate = endDate;
    this.prize = prize;
    this.partnerName = partnerName;
  }
}
