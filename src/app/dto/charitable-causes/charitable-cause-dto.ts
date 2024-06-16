export class CharitableCauseDto {
  public id: number;
  public name: string;
  public description: string;
  public neededAmount: number;
  public collectedAmount: number;


  constructor(id: number, name: string, description: string, neededAmount: number, collectedAmount: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.neededAmount = neededAmount;
    this.collectedAmount = collectedAmount;
  }
}
