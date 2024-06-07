
export class LocationDto {
  public id: number;
  public fullAddress: string;

  constructor(id: number, fullAddress: string) {
    this.id = id;
    this.fullAddress = fullAddress;
  }
}
