import {LocationDto} from "../locations/location-dto";
import {StandingCategoryDto} from "./standing-category-dto";

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
  public organiserRating: string;
  public standingCategories: StandingCategoryDto[];


  constructor(id: number, name: string, description: string, startDate: Date, endDate: Date, logo: string,
              charityPercentage: number, rejectionReason: string, location: LocationDto, organiserName: string,
              organiserRating: string, standingCategories: StandingCategoryDto[]) {
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
    this.organiserRating = organiserRating;
    this.standingCategories = standingCategories;
  }
}
