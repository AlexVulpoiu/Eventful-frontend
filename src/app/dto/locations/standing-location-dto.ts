import {AbstractLocationDto} from "./abstract-location-dto";

export class StandingLocationDto extends AbstractLocationDto {
  public capacity: number;

  constructor(id: number, name: string, city: string, country: string, address: string, capacity: number) {
    super(id, name, city, country, address);
    this.capacity = capacity;
  }
}
