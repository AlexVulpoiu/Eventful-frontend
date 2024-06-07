import {OrganiserSignupRequest} from "./organiser-signup-request";

export class PersonSignupRequest extends OrganiserSignupRequest {
  cnp: number;

  constructor(email: string, firstName: string, lastName: string, password: string,
              country: string, district: string, city: string, street: string, building: string, zipCode: string,
              bank: string, iban: string,
              commerceRegistrationNumber: string,
              cnp: number) {
    super(email, firstName, lastName, password, country, district, city, street, building, zipCode, bank, iban, commerceRegistrationNumber);
    this.cnp = cnp;
  }
}
