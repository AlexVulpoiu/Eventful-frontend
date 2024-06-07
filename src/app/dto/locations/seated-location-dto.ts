import {AbstractLocationDto} from "./abstract-location-dto";
import {SeatsCategoryDto} from "./seats-category-dto";

export class SeatedLocationDto extends AbstractLocationDto {
  public numberOfRows: number;
  public seatsPerRow: number;
  public seatsCategories: SeatsCategoryDto[];

  constructor(id: number, name: string, city: string, country: string, address: string, numberOfRows: number, seatsPerRow: number, seatsCategories: SeatsCategoryDto[]) {
    super(id, name, city, country, address);
    this.numberOfRows = numberOfRows;
    this.seatsPerRow = seatsPerRow;
    this.seatsCategories = seatsCategories;
  }

  public getFullAddress(): string {
    return this.address + ', ' + this.city + ', ' + this.country;
  }
}
