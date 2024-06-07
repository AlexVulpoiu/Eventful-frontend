import {OrganiserSignupRequest} from "./organiser-signup-request";

export class LegalPersonSignupRequest extends OrganiserSignupRequest {
  cui: number;
  name: string;

  constructor(email: string, firstName: string, lastName: string, password: string,
              country: string, district: string, city: string, street: string, building: string, zipCode: string,
              bank: string, iban: string,
              commerceRegistrationNumber: string,
              cui: number, name: string) {
    super(email, firstName, lastName, password, country, district, city, street, building, zipCode, bank, iban, commerceRegistrationNumber);
    this.cui = cui;
    this.name = name;
  }
}
