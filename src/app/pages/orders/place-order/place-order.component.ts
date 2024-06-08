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
  ticketsPerCategory: number[] = [];
  total: number = 0;
  useDiscount: boolean = false;
  eventId: number = 0;

  constructor(private eventOrderService: EventOrderService, @Inject(LOCALE_ID) public locale: string,
              private orderService: OrdersService, private paymentService: PaymentService, private router: Router) {

  }

  updateTotal(event: MatCheckboxChange) {
    if (event.checked) {
      this.total -= 10;
      this.useDiscount = true;
    } else {
      this.total += 10;
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
      this.ticketsPerCategory = data.ticketsPerCategory;
      this.total = data.total;
      this.eventId = data.event.id;
    });
  }

  placeOrder() {
    const standingTicketsInfo: any = {};
    for (let i = 0; i < this.ticketsPerCategory.length; i++) {
      if (this.ticketsPerCategory[i] > 0) {
        standingTicketsInfo[this.standingCategories[i].name] = this.ticketsPerCategory[i];
      }
    }

    let newOrderDto = new NewOrderDto(this.eventId, 0, standingTicketsInfo, []);
    this.orderService.placeOrder(newOrderDto).subscribe(
      res => {
        this.paymentService.initiatePayment(res.id).subscribe(
          data => window.location.href = data.sessionUrl
        )
      }
    );
  }

  protected readonly formatDate = formatDate;
}
