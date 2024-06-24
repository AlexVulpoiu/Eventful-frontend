import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {EventOrderService} from "../../../services/event-order.service";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {TablerIconsModule} from "angular-tabler-icons";
import {OrderDetails} from "../../../dto/orders/order-details-dto";
import {MatButton} from "@angular/material/button";
import {StandingCategoryDto} from "../../../dto/events/standing-category-dto";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {OrdersService} from "../../../services/orders.service";
import {NewOrderDto} from "../../../dto/orders/new-order-dto";
import {PaymentService} from "../../../services/payment.service";
import {Router} from "@angular/router";
import {SeatDetails} from "../../../dto/orders/seat-details";
import {ProfileService} from "../../../services/profile.service";
import {NotificationService} from "../../../services/notification.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    NgIf,
    TablerIconsModule,
    MatButton,
    NgForOf,
    MatSlideToggle,
    MatCheckbox
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit {
  orderDetails: OrderDetails | undefined;
  startDate: Date = new Date();
  endDate: Date = new Date();
  name: string = '';
  location: string = '';
  standingCategories: StandingCategoryDto[] = [];
  seatsCategories: string[] = [];
  seatsPrices: number[] = [];
  seatedTickets: any = [];
  ticketsPerCategory: number[] = [];
  total: number = 0;
  useDiscount: boolean = false;
  eventId: number = 0;
  points: number = 0;
  roles: string[] = [];
  buttonDisabled: boolean = false;

  constructor(private eventOrderService: EventOrderService, @Inject(LOCALE_ID) public locale: string,
              private orderService: OrdersService, private paymentService: PaymentService, private router: Router,
              private profileService: ProfileService, private notificationService: NotificationService, private tokenStorageService: TokenStorageService) {
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.roles = user.roles;
    }

    if (!this.roles.includes('USER')) {
      if (this.roles.length === 0) {
        this.router.navigate(['/events']);
      } else {
        this.router.navigate(['/events/all']);
      }
    }
  }

  updateTotal(event: MatCheckboxChange) {
    if (event.checked) {
      this.total -= this.points / 10;
      this.useDiscount = true;
    } else {
      this.total += this.points / 10;
      this.useDiscount = false;
    }
  }

  ngOnInit(): void {
    this.eventOrderService.getMessage.subscribe(data => {
      this.orderDetails = data;
      this.startDate = data.event.startDate;
      this.endDate = data.event.endDate;
      this.name = data.event.name;
      this.location = data.event.location.fullAddress;
      this.standingCategories = data.standingCategories;
      this.seatsCategories = data.seatsCategories;
      this.seatsPrices = data.seatsCategoriesPrices;
      this.seatedTickets = data.seatedTickets;
      this.ticketsPerCategory = data.ticketsPerCategory;
      this.total = data.total;
      this.eventId = data.event.id;
    });

    this.profileService.getAvailablePoints().subscribe({
      next: data => {
        this.points = data;
        if (this.points >= this.total * 10 - 20) {
          this.points = this.total * 10 - 20;
        }
      }, error: err => {
        let message = typeof err.error === "string" ? err.error : 'Internal server error';
        let status = typeof err.status === "number" ? err.status : 500;

        if (status === 401 || status === 403) {
          if (this.roles.length === 0 || this.roles.includes('USER')) {
            this.router.navigate(['/events']);
          } else {
            this.router.navigate(['/events/all']);
          }
        } else if (400 <= status && status < 500) {
          this.notificationService.showWarning(message);
        } else {
          this.notificationService.showError(message);
        }
      }
    });
  }

  placeOrder() {
    if (this.standingCategories.length > 0) {
      const standingTicketsInfo: any = {};
      for (let i = 0; i < this.ticketsPerCategory.length; i++) {
        if (this.ticketsPerCategory[i] > 0) {
          standingTicketsInfo[this.standingCategories[i].name] = this.ticketsPerCategory[i];
        }
      }

      this.buttonDisabled = true;
      let newOrderDto = new NewOrderDto(this.eventId, this.useDiscount ? this.points : 0, standingTicketsInfo, []);
      this.orderService.placeOrder(newOrderDto).subscribe({
          next: res => {
            this.paymentService.initiatePayment(res.id).subscribe({
                next: data => {
                  window.location.href = data.sessionUrl;
                },
                error: err => {
                  let message = typeof err.error === "string" ? err.error : 'Internal server error';
                  let status = typeof err.status === "number" ? err.status : 500;

                  if (status === 401 || status === 403) {
                    if (this.roles.includes('ORGANISER')) {
                      this.router.navigate(['/events/all']);
                    } else {
                      this.router.navigate(['/events']);
                    }
                  } else if (400 <= status && status < 500) {
                    this.notificationService.showWarning(message);
                  } else {
                    this.notificationService.showError(message);
                  }
                }
              }
            );
          },
          error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            let status = typeof err.status === "number" ? err.status : 500;

            if (status === 401 || status === 403) {
              if (this.roles.includes('ORGANISER')) {
                this.router.navigate(['/events/all']);
              } else {
                this.router.navigate(['/events']);
              }
            } else if (400 <= status && status < 500) {
              this.notificationService.showWarning(message);
            } else {
              this.notificationService.showError(message);
            }
          }
        }
      );
    } else {
      let seatsDetails = [];
      for (let i = 0; i < this.seatedTickets.length; i++) {
        let t = this.seatedTickets[i];
        seatsDetails.push(new SeatDetails(t.categoryId, t.row, t.seat));
      }

      let newOrderDto = new NewOrderDto(this.eventId, 0, {}, seatsDetails);
      this.orderService.placeOrder(newOrderDto).subscribe({
          next: res => {
            this.paymentService.initiatePayment(res.id).subscribe({
                next: data => {
                  window.location.href = data.sessionUrl;
                },
                error: err => {
                  let message = typeof err.error === "string" ? err.error : 'Internal server error';
                  let status = typeof err.status === "number" ? err.status : 500;

                  if (status === 401 || status === 403) {
                    if (this.roles.includes('ORGANISER')) {
                      this.router.navigate(['/events/all']);
                    } else {
                      this.router.navigate(['/events']);
                    }
                  } else if (400 <= status && status < 500) {
                    this.notificationService.showWarning(message);
                  } else {
                    this.notificationService.showError(message);
                  }
                }
              }
            );
          },
          error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            let status = typeof err.status === "number" ? err.status : 500;

            if (status === 401 || status === 403) {
              if (this.roles.includes('ORGANISER')) {
                this.router.navigate(['/events/all']);
              } else {
                this.router.navigate(['/events']);
              }
            } else if (400 <= status && status < 500) {
              this.notificationService.showWarning(message);
            } else {
              this.notificationService.showError(message);
            }
          }
        }
      );
    }
  }

  protected readonly formatDate = formatDate;
}
