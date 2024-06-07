import {BaseSignupRequest} from "./base-signup-request";
import {AddAddress} from "../add-address";
import {AddBankAccount} from "../add-bank-account";

export abstract class OrganiserSignupRequest extends BaseSignupRequest {
  address: AddAddress;
  bankAccount: AddBankAccount;
  commerceRegistrationNumber: string;

  constructor(email: string, firstName: string, lastName: string, password: string,
              country: string, district: string, city: string, street: string, building: string, zipCode: string,
              bank: string, iban: string,
              commerceRegistrationNumber: string) {
    super(email, firstName, lastName, password);
    this.address = new AddAddress(country, district, city, street, building, zipCode);
    this.bankAccount = new AddBankAccount(bank, iban);
    this.commerceRegistrationNumber = commerceRegistrationNumber;
  }
}
