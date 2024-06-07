export class EventPreviewDto {
  public id: number;
  public name: string;
  public startDate: Date;
  public endDate: Date;
  public logo: string;
  public location: string;

  constructor(id: number, name: string, startDate: Date, endDate: Date, logo: string, location: string) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.logo = logo;
    this.location = location;
  }
}
