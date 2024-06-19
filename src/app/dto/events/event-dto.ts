import {LocationDto} from "../locations/location-dto";
import {StandingCategoryDto} from "./standing-category-dto";
import {SeatsCategoryDetails} from "../locations/seats-category-details";
import {Seat} from "./seat";
import { RaffleDto } from "../raffles/raffle-dto";
import {CharitableCauseDto} from "../charitable-causes/charitable-cause-dto";

export class EventDto {
  public id: number;
  public name: string;
  public description: HTMLElement = new HTMLElement();
  public startDate: Date;
  public endDate: Date;
  public logo: string;
  public status: string;
  public charityPercentage: number;
  public rejectionReason: string;
  public location: LocationDto;
  public organiserName: string;
  public discount: number;
  public discountEndDate: Date;
  public soldTickets: number;
  public participants: number;
  public raffle: RaffleDto;
  public charitableCause: CharitableCauseDto;
  public standingCategories: StandingCategoryDto[];
  public seatsCategories: SeatsCategoryDetails[];
  public unavailableSeats: Seat[];

  constructor(id: number, name: string, description: string, startDate: Date, endDate: Date, logo: string, status: string,
              charityPercentage: number, rejectionReason: string, location: LocationDto, organiserName: string,
              discount: number, discountEndDate: Date, soldTickets: number, participants: number, raffle: RaffleDto, charitableCause: CharitableCauseDto,
              standingCategories: StandingCategoryDto[], seatsCategories: SeatsCategoryDetails[], unavailableSeats: Seat[]) {
    this.id = id;
    this.name = name;
    this.description.innerHTML = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.logo = logo;
    this.status = status;
    this.charityPercentage = charityPercentage;
    this.rejectionReason = rejectionReason;
    this.location = location;
    this.organiserName = organiserName;
    this.discount = discount;
    this.discountEndDate = discountEndDate;
    this.soldTickets = soldTickets;
    this.participants = participants;
    this.raffle = raffle;
    this.charitableCause = charitableCause;
    this.standingCategories = standingCategories;
    this.seatsCategories = seatsCategories;
    this.unavailableSeats = unavailableSeats;
  }
}
