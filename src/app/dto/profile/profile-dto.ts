import {OrderProfileDetails} from "../orders/order-profile-details-dto";

export class ProfileDto {
  public name: string;
  public email: string;
  public phone: string;
  public xp: number;
  public availablePoints: number;
  public orders: OrderProfileDetails[];


  constructor(name: string, email: string, phone: string, xp: number, availablePoints: number, orders: OrderProfileDetails[]) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.xp = xp;
    this.availablePoints = availablePoints;
    this.orders = orders;
  }
}
