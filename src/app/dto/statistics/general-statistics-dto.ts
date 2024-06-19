export class GeneralStatisticsDto {
  public months: string[];
  public incomePerMonth: number[];
  public eventsPerMonth: number[];
  public totalIncome: number;
  public totalEvents: number;
  public totalTicketsSold: number;
  public totalUsers: number;

  constructor(months: string[], incomePerMonth: number[], eventsPerMonth: number[], totalIncome: number, totalEvents: number, totalTicketsSold: number, totalUsers: number) {
    this.months = months;
    this.incomePerMonth = incomePerMonth;
    this.eventsPerMonth = eventsPerMonth;
    this.totalIncome = totalIncome;
    this.totalEvents = totalEvents;
    this.totalTicketsSold = totalTicketsSold;
    this.totalUsers = totalUsers;
  }
}
