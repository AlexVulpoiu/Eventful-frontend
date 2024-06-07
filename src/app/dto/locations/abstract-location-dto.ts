export abstract class AbstractLocationDto {
  public id: number;
  public name: string;
  public city: string;
  public country: string;
  public address: string;

  constructor(id: number, name: string, city: string, country: string, address: string) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.country = country;
    this.address = address;
  }
}
