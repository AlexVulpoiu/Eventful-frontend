import {LocationDto} from "../locations/location-dto";
import {StandingCategoryDto} from "./standing-category-dto";
import {SeatsCategoryDetails} from "../locations/seats-category-details";
import {Seat} from "./seat";

export class EventDto {
  public id: number;
  public name: string;
  public description: HTMLElement = new HTMLElement();
  public startDate: Date;
  public endDate: Date;
  public logo: string;
  public charityPercentage: number;
  public rejectionReason: string;
  public location: LocationDto;
  public organiserName: string;
  public discount: number;
  public discountEndDate: Date;
  public standingCategories: StandingCategoryDto[];
  public seatsCategories: SeatsCategoryDetails[];
  public unavailableSeats: Seat[];

  constructor(id: number, name: string, description: string, startDate: Date, endDate: Date, logo: string,
              charityPercentage: number, rejectionReason: string, location: LocationDto, organiserName: string,
              discount: number, discountEndDate: Date, standingCategories: StandingCategoryDto[], seatsCategories: SeatsCategoryDetails[],
              unavailableSeats: Seat[]) {
    this.id = id;
    this.name = name;
    this.description.innerHTML = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.logo = logo;
    this.charityPercentage = charityPercentage;
    this.rejectionReason = rejectionReason;
    this.location = location;
    this.organiserName = organiserName;
    this.discount = discount;
    this.discountEndDate = discountEndDate;
    this.standingCategories = standingCategories;
    this.seatsCategories = seatsCategories;
    this.unavailableSeats = unavailableSeats;
  }
}
