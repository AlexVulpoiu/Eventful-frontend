import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {EventDto} from "../../../dto/events/event-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {formatDate, NgClass, NgFor, NgIf, NgStyle} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {StandingCategoryDto} from "../../../dto/events/standing-category-dto";
import {EventOrderService} from "../../../services/event-order.service";
import {OrderDetails} from "../../../dto/orders/order-details-dto";
import {SeatsCategoryDetails} from "../../../dto/locations/seats-category-details";
import {MatTooltip} from "@angular/material/tooltip";
import {SeatedTicketDto} from "../../../dto/orders/seated-ticket-dto";
import {MatDialog} from "@angular/material/dialog";
import {AddPromotionComponent} from "../add-promotion/add-promotion.component";
import {EventPromotionService} from "../../../services/event-promotion.service";
import {EventRaffleService} from "../../../services/event-raffle.service";
import {AddRaffleComponent} from "../add-raffle/add-raffle.component";
import {ApproveEventComponent} from "../approve-event/approve-event.component";
import {EventApproveService} from "../../../services/event-approve.service";
import {EventRejectService} from "../../../services/event-reject.service";
import {RejectEventComponent} from "../reject-event/reject-event.component";
import {TokenStorageService} from "../../../services/token-storage.service";
import {MatIcon} from "@angular/material/icon";
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {EventReviewsService} from "../../../services/event-reviews-service";
import {EventReviewsComponent} from "../event-reviews/event-reviews.component";
import {EventOrdersService} from "../../../services/event-orders-service";
import {EventOrdersComponent} from "../event-orders/event-orders.component";
import {EventTicketsScannerService} from "../../../services/event-tickets-scanner";
import {EventEditService} from "../../../services/event-edit.service";
import {EditNameComponent} from "../edit-name/edit-name.component";
import {EditDescriptionComponent} from "../edit-description/edit-description.component";
import {EditCharitableCauseComponent} from "../edit-charitable-cause/edit-charitable-cause.component";
import {EditPricesComponent} from "../edit-prices/edit-prices.component";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    NgStyle,
    TablerIconsModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    NgIf,
    NgFor,
    NgClass,
    MatTooltip,
    MatIcon,
    MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatAccordion,
    MatIconButton
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {

  eventDto: EventDto | undefined;
  startDate: Date = new Date();
  startDateAsDate: Date = new Date();
  endDate: Date = new Date();
  endDateAsDate: Date = new Date();
  standingCategories: StandingCategoryDto[] = [];
  seatsCategories: SeatsCategoryDetails[] = [];
  safeMapsUrl: SafeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('');
  displayedColumns: string[] = ['category', 'price', 'cart'];
  ticketsPerCategory: number[] = [];
  location: any;
  unavailableSeats: any = [];
  roles: string[] = [];
  discount: number = 0;
  discountEndDate: Date = new Date();
  currentDate: Date = new Date();

  private seatConfig: any = [];
  protected seatmap: any[] = [];

  protected seatChartConfig = {
    showRowsLabel: true,
    showRowWisePricing: false,
    newSeatNoForRow: true
  }

  protected cart = {
    selectedSeats: [] as any[],
    seatstoStore: [] as any[],
    totalamount: 0,
    cartId: "",
    eventId: 0
  };

  constructor(private route: ActivatedRoute, private eventService: EventService, private domSanitizer: DomSanitizer,
              @Inject(LOCALE_ID) public locale: string, protected router: Router,
              private eventOrderService: EventOrderService, private eventPromotionService: EventPromotionService,
              private eventRaffleService: EventRaffleService, private eventApproveService: EventApproveService,
              private eventRejectService: EventRejectService, private eventReviewsService: EventReviewsService,
              private eventOrdersService: EventOrdersService, private eventTicketsScannerService: EventTicketsScannerService,
              private eventEditService: EventEditService, private notificationService: NotificationService,
              public dialog: MatDialog, private tokenStorageService: TokenStorageService) {
    let message = localStorage.getItem('event-page-message');
    if (message != null && message.length > 0) {
      this.notificationService.showInfo(message);
      localStorage.removeItem('event-page-message');
    }
  }

  openPromotionDialog(): void {
    this.eventPromotionService.setMessage({
      eventId: this.eventDto?.id,
      limitDate: this.eventDto?.endDate
    });

    const dialogRef = this.dialog.open(AddPromotionComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result here
        console.log('The dialog was closed with data: ', result);
      }
    });
  }

  openRaffleDialog() {
    this.eventRaffleService.setMessage({
      eventId: this.eventDto?.id,
      limitDate: this.eventDto?.endDate
    });

    const dialogRef = this.dialog.open(AddRaffleComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with data: ', result);
      }
    });
  }

  openEditNameDialog() {
    this.eventEditService.setMessage({name: this.eventDto?.name, id: this.eventDto?.id});

    const dialogRef = this.dialog.open(EditNameComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(() => window.location.reload());
  }

  openEditDescriptionDialog() {
    this.eventEditService.setMessage({description: this.eventDto?.description, id: this.eventDto?.id});

    const dialogRef = this.dialog.open(EditDescriptionComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(() => window.location.reload());
  }

  openEditCharitableCauseDialog() {
    this.eventEditService.setMessage({
      id: this.eventDto?.charitableCause.id,
      name: this.eventDto?.charitableCause.name,
      description: this.eventDto?.charitableCause.description,
      neededAmount: this.eventDto?.charitableCause.neededAmount
    });

    const dialogRef = this.dialog.open(EditCharitableCauseComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(() => window.location.reload());
  }

  openPricesEditDialog() {
    this.eventEditService.setMessage({
      id: this.eventDto?.id,
      categories: this.standingCategories.length > 0 ? this.standingCategories : this.seatsCategories
    });

    const dialogRef = this.dialog.open(EditPricesComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(() => window.location.reload());
  }

  goToTicketsScannerPage() {
    this.eventTicketsScannerService.setMessage({eventId: this.eventDto?.id});
    this.router.navigate(['/tickets-scanner']);
  }

  openOrdersDialog() {
    this.eventService.getOrders(this.eventDto?.id!).subscribe(
      {
        next: data => {
          this.eventOrdersService.setMessage(data);
        },
        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.router.navigate(['/events/all']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      }
    );

    const dialogRef = this.dialog.open(EventOrdersComponent, {
      width: '600px'
    });
  }

  openReviewsDialog() {
    this.eventService.getReviews(this.eventDto?.id!).subscribe(
      {
        next: data => {
          this.eventReviewsService.setMessage(data);
        },
        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.router.navigate(['/events/all']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      }
    );

    const dialogRef = this.dialog.open(EventReviewsComponent, {
      width: '600px'
    });
  }

  openApprovalDialog(): void {
    this.eventApproveService.setMessage({
      eventId: this.eventDto?.id
    });

    const dialogRef = this.dialog.open(ApproveEventComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the approval result here
        console.log('The event was approved.');
      } else {
        console.log('The approval was cancelled.');
      }
    });
  }

  openRejectionDialog() {
    this.eventRejectService.setMessage({
      eventId: this.eventDto?.id
    });

    const dialogRef = this.dialog.open(RejectEventComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the approval result here
        console.log('The event was rejected.');
      } else {
        console.log('The rejection was cancelled.');
      }
    });
  }

  sendDataToOrderPage() {
    let data;
    let seatsCategoriesMap = new Map<string, number>();
    let prices = [];
    if (this.seatsCategories.length > 0) {
      let tickets = [];
      for (let i = 0; i < this.cart.selectedSeats.length; i++) {
        let s = this.cart.selectedSeats[i];
        tickets.push(new SeatedTicketDto(s.categoryId, s.category, s.price, s.row, s.seat));

        let n = seatsCategoriesMap.get(s.category);
        if (n == undefined) {
          n = 0;
        }
        seatsCategoriesMap.set(s.category, n + 1);
        if (n == 0) {
          prices.push(s.price);
        }
      }

      data = new OrderDetails(this.eventDto, [], Array.from(seatsCategoriesMap.values()),
        this.cart.totalamount, tickets, Array.from(seatsCategoriesMap.keys()), prices);
    } else {
      data = new OrderDetails(this.eventDto, this.standingCategories, this.ticketsPerCategory,
        this.getTotalAmountForStandingEvent(), [], [], []);
    }

    this.eventOrderService.setMessage(data);
    this.router.navigate(['/orders/new']);
  }

  ngOnInit() {
    const mapsApiKey = environment.MAPS_API_KEY;
    this.route.params.subscribe(params => {
      this.eventService.getEvent(params['eventId']).subscribe(
        {
          next: res => {
            this.eventDto = res;
            const url = `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${this.eventDto?.location.fullAddress}`;
            this.safeMapsUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
            this.startDate = this.eventDto.startDate;
            this.startDateAsDate = new Date(this.startDate);
            this.endDate = this.eventDto.endDate;
            this.endDateAsDate = new Date(this.endDate);
            this.standingCategories = this.eventDto.standingCategories;
            this.seatsCategories = this.eventDto.seatsCategories;
            this.unavailableSeats = this.eventDto.unavailableSeats;
            this.discount = this.eventDto.discount;
            this.discountEndDate = this.eventDto.discountEndDate;
            // console.log(this.unavailableSeats);
            this.location = this.eventDto.location;
            for (let i = 0; i < this.standingCategories.length; i++) {
              this.ticketsPerCategory.push(0);
            }

            if (this.seatsCategories.length > 0) {
              this.seatConfig = [];
              let seatMap = [];
              for (let i = 0; i < this.location.rows; i++) {
                seatMap.push({
                  "seat_label": "Row " + (i + 1),
                  "layout": "_" + "x".repeat(this.location.seatsPerRow)
                });
              }
              this.seatConfig.push({
                "seat_map": seatMap
              });
            }
            this.processSeatChart(this.seatConfig);
          },
          error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            let status = typeof err.status === "number" ? err.status : 500;

            if (status === 401 || status === 403) {
              if (this.roles.length == 0 || this.roles.includes('USER')) {
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
    });
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.roles = user.roles;
    }
    window.scrollTo(0, 0);
  }

  // Method to increase the value
  increaseValue(index: number) {
    if (this.getTotalTickets() < 10) {
      this.ticketsPerCategory[index]++;
    }
  }

  // Method to decrease the value
  decreaseValue(index: number) {
    if (this.ticketsPerCategory[index] > 0) {
      this.ticketsPerCategory[index]--;
    }
  }

  getTotalTickets(): number {
    let s: number = 0;
    this.ticketsPerCategory.forEach(v => s += v);
    return s;
  }

  getTotalAmountForStandingEvent(): number {
    let s: number = 0;
    for (let i = 0; i < this.ticketsPerCategory.length; i++) {
      s += this.ticketsPerCategory[i] * this.standingCategories[i].price;
    }
    return s;
  }

  public processSeatChart(map_data: any[]) {

    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = "";
        var item_map = map_data[__counter].seat_map;

        //Get the label name and price
        row_label = "Row " + item_map[0].seat_label + " - ";
        if (item_map[item_map.length - 1].seat_label != " ") {
          row_label += item_map[item_map.length - 1].seat_label;
        } else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        row_label += " : RON. " + map_data[__counter].seat_price;

        item_map.forEach((map_element: { seat_label: string; layout: string; }) => {
          var mapObj = {
            "seatRowLabel": map_element.seat_label,
            "seats": [] as any[],
            "seatPricingInformation": row_label
          };
          row_label = "";
          var seatValArr = map_element.layout.split('');
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; //Reset the seat label counter for new row
          }
          var totalItemCounter = 1;
          seatValArr.forEach(item => {
            var row = +map_element.seat_label.substring(4);
            var category = this.getCategory(row, seatNoCounter);
            var seatObj: any = {
              "key": map_element.seat_label + "_" + totalItemCounter,
              "price": this.getPrice(row, seatNoCounter),
              "status": this.getStatus(row, seatNoCounter),
              "row": +map_element.seat_label.substring(4),
              "seat": seatNoCounter,
              "category": category?.name,
              "categoryId": category?.id,
              "seatLabel": "",
              "seatNo": ""
            };

            if (item != '_') {
              seatObj["seatLabel"] = map_element.seat_label + ", Seat " + seatNoCounter;
              seatObj["seatNo"] = seatNoCounter;
              // if(seatNoCounter < 10)
              // { seatObj["seatNo"] = "0"+seatNoCounter; }
              // else { seatObj["seatNo"] = ""+seatNoCounter; }

              seatNoCounter++;
            } else {
              seatObj["seatLabel"] = "";
            }
            totalItemCounter++;
            mapObj["seats"].push(seatObj);
          });
          // console.log(" \n\n\n Seat Objects ", mapObj);
          this.seatmap.push(mapObj);

        });
      }
    }
  }

  public selectSeat(seatObject: any) {
    console.log("Seat to block: ", seatObject);

    if (seatObject.status == "available" && this.cart.selectedSeats.length < 10) {
      seatObject.status = "booked";
      this.cart.selectedSeats.push(seatObject);
      this.cart.seatstoStore.push(seatObject["key"]);
      this.cart.totalamount += seatObject.price;
    } else if (seatObject.status == "booked") {
      seatObject.status = "available";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }

    }
  }

  public blockSeats(seatsToBlock: string) {
    if (seatsToBlock != "") {
      var seatsToBlockArr = seatsToBlock.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split("_");
        // console.log("Split seat: ", seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              // console.log("\n\n\nFount Seat to block: ", seatObj);
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
              // console.log("\n\n\nSeat Obj", seatObj);
              // console.log(this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]);
              break;
            }

          }
        }

      }
    }

  }

  getPrice(row: number, seat: number): number {
    for (let i = 0; i < this.seatsCategories.length; i++) {
      let sc = this.seatsCategories[i];
      if (sc.minRow <= row && row <= sc.maxRow && sc.minSeat <= seat && seat <= sc.maxSeat) {
        return sc.price;
      }
    }
    return 0;
  }

  getCategory(row: number, seat: number) {
    for (let i = 0; i < this.seatsCategories.length; i++) {
      let sc = this.seatsCategories[i];
      if (sc.minRow <= row && row <= sc.maxRow && sc.minSeat <= seat && seat <= sc.maxSeat) {
        return sc;
      }
    }
    return null;
  }

  getStatus(row: number, seat: number): string {
    for (let i = 0; i < this.unavailableSeats.length; i++) {
      let s = this.unavailableSeats[i];
      if (s.row == row && s.seat == seat) {
        return "unavailable";
      }
    }
    return "available";
  }

  protected readonly formatDate = formatDate;
}
