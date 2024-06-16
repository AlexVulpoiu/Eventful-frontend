import {AddAddress} from "../organisers/add-address";
import {AddBankAccount} from "../organisers/add-bank-account";

export class OrganiserProfileDto {
  public name: string;
  public email: string;
  public phone: string;
  public address: AddAddress;
  public bankAccount: AddBankAccount;
  public commerceRegistrationNumber: string;
  public cui: number;
  public cnp: number;
  public legalName: string;


  constructor(name: string, email: string, phone: string, address: AddAddress, bankAccount: AddBankAccount, commerceRegistrationNumber: string, cui: number, cnp: number, legalName: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.bankAccount = bankAccount;
    this.commerceRegistrationNumber = commerceRegistrationNumber;
    this.cui = cui;
    this.cnp = cnp;
    this.legalName = legalName;
  }
}
