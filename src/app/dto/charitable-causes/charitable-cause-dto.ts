export class CharitableCauseDto {
  public name: string;
  public description: string;
  public neededAmount: number;
  public collectedAmount: number;


  constructor(name: string, description: string, neededAmount: number, collectedAmount: number) {
    this.name = name;
    this.description = description;
    this.neededAmount = neededAmount;
    this.collectedAmount = collectedAmount;
  }
}
