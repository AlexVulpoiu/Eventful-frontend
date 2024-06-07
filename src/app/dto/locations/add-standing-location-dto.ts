import {AddAbstractLocationDto} from "./add-abstract-location-dto";

export class AddStandingLocationDto extends AddAbstractLocationDto {
  public capacity: number;

  constructor(name: string, city: string, country: string, address: string, capacity: number) {
    super(name, city, country, address);
    this.capacity = capacity;
  }
}
