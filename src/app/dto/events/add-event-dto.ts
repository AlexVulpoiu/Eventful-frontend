import {AddCategoryPriceDto} from "./add-category-price-dto";
import {AddStandingCategoryDto} from "./add-standing-category-dto";
import {AddCharitableCauseDto} from "../charitable-causes/add-charitable-cause-dto";

export class AddEventDto {
  public name: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public preparationTime: number
  public feeSupporter: string;
  public charityPercentage: number;
  public locationId: number;
  public addCharitableCause: AddCharitableCauseDto;
  public categoriesPrices: AddCategoryPriceDto[];
  public standingCategories: AddStandingCategoryDto[];


  constructor(name: string, description: string, startDate: Date, endDate: Date, preparationTime: number,
              feeSupporter: string, charityPercentage: number, locationId: number, addCharitableCauseDto: AddCharitableCauseDto,
              categoriesPrices: AddCategoryPriceDto[], standingCategories: AddStandingCategoryDto[]) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.preparationTime = preparationTime;
    this.feeSupporter = feeSupporter;
    this.charityPercentage = charityPercentage;
    this.locationId = locationId;
    this.addCharitableCause = addCharitableCauseDto;
    this.categoriesPrices = categoriesPrices;
    this.standingCategories = standingCategories;
  }
}
