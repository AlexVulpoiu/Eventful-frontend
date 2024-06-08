export class AddAddress {
  country: string;
  district: string;
  city: string;
  street: string;
  building: string;
  zipCode: string;

  constructor(country: string, district: string, city: string, street: string, building: string, zipCode: string) {
    this.country = country;
    this.district = district;
    this.city = city;
    this.street = street;
    this.building = building;
    this.zipCode = zipCode;
  }
}
