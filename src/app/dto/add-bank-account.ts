export class AddBankAccount {
  bank: string;
  iban: string;

  constructor(bank: string, iban: string) {
    this.bank = bank;
    this.iban = iban;
  }
}
