export class AddCharitableCauseDto {
  public name: string;
  public description: string;
  public neededAmount: number;


  constructor(name: string, description: string, neededAmount: number) {
    this.name = name;
    this.description = description;
    this.neededAmount = neededAmount;
  }
}
