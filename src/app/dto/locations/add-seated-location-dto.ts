import {AddAbstractLocationDto} from "./add-abstract-location-dto";
import {AddSeatCategoryDto} from "./add-seats-category-dto";

export class AddSeatedLocationDto extends AddAbstractLocationDto {
  public numberOfRows: number;
  public seatsPerRow: number;
  public seatsCategories: AddSeatCategoryDto[];

  constructor(name: string, city: string, country: string, address: string, numberOfRows: number, seatsPerRow: number, seatsCategories: AddSeatCategoryDto[]) {
    super(name, city, country, address);
    this.numberOfRows = numberOfRows;
    this.seatsPerRow = seatsPerRow;
    this.seatsCategories = seatsCategories;
  }
}
