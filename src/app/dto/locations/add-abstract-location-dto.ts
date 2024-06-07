export abstract class AddAbstractLocationDto {
  public name: string;
  public city: string;
  public country: string;
  public address: string;

  constructor(name: string, city: string, country: string, address: string) {
    this.name = name;
    this.city = city;
    this.country = country;
    this.address = address;
  }
}
