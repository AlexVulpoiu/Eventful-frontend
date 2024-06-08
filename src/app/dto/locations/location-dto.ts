
export class LocationDto {
  public id: number;
  public fullAddress: string;
  public rows: number;
  public seatsPerRow: number;

  constructor(id: number, fullAddress: string, rows: number, seatsPerRow: number) {
    this.id = id;
    this.fullAddress = fullAddress;
    this.rows = rows;
    this.seatsPerRow = seatsPerRow;
  }
}
