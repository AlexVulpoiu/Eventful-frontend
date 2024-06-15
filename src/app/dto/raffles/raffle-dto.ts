export class RaffleDto {
  public participantsLimit: number;
  public endDate: Date;
  public prize: number;
  public partnerName: string;
  public totalParticipants: number;


  constructor(participantsLimit: number, endDate: Date, prize: number, partnerName: string, totalParticipants: number) {
    this.participantsLimit = participantsLimit;
    this.endDate = endDate;
    this.prize = prize;
    this.partnerName = partnerName;
    this.totalParticipants = totalParticipants;
  }
}
