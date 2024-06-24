export class AddRaffleDto {
  public participantsLimit: number;
  public endDate: Date | null;
  public prize: number;
  public partnerName: string;


  constructor(participantsLimit: number, endDate: Date | null, prize: number, partnerName: string) {
    this.participantsLimit = participantsLimit;
    this.endDate = endDate;
    this.prize = prize;
    this.partnerName = partnerName;
  }
}
