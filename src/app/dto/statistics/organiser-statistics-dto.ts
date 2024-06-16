export class OrganiserStatisticsDto {
  public months: string[];
  public incomePerMonth: number[];
  public eventsPerMonth: number[];
  public charityAmount: number;
  public causesThisYear: number;
  public causesLastYear: number;
  public charityIncrease: number;


  constructor(months: string[], incomePerMonth: number[], eventsPerMonth: number[], charityAmount: number, causesThisYear: number, causesLastYear: number, charityIncrease: number) {
    this.months = months;
    this.incomePerMonth = incomePerMonth;
    this.eventsPerMonth = eventsPerMonth;
    this.charityAmount = charityAmount;
    this.causesThisYear = causesThisYear;
    this.causesLastYear = causesLastYear;
    this.charityIncrease = charityIncrease;
  }
}
