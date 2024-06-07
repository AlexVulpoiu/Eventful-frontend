import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {EventDto} from "../../../dto/events/event-dto";
import {ActivatedRoute} from "@angular/router";
import {EventsService} from "../../../services/events.service";
import {formatDate, NgFor, NgIf, NgStyle} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatButton} from "@angular/material/button";
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
    NgFor
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {

  eventDto: EventDto | undefined;
  startDate: Date = new Date();
  endDate: Date = new Date();
  standingCategories: StandingCategoryDto[] = [];
  safeMapsUrl: SafeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('');
  displayedColumns: string[] = ['category', 'price', 'cart'];
  ticketsPerCategory: number[] = [];

  constructor(private route: ActivatedRoute, private eventService: EventsService, private domSanitizer: DomSanitizer,
              @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit() {
    const mapsApiKey = environment.MAPS_API_KEY;
    this.route.params.subscribe(params => {
      this.eventService.getEvent(params['eventId']).subscribe(res => {
        this.eventDto = res;
        const url = `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${this.eventDto?.location.fullAddress}`;
        this.safeMapsUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
        this.startDate = this.eventDto.startDate;
        this.endDate = this.eventDto.endDate;
        this.standingCategories = this.eventDto.standingCategories;
        for (let i = 0; i < this.standingCategories.length; i++) {
          this.ticketsPerCategory.push(0);
        }
      });
    });
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

  getTotalAmount(): number {
    let s: number = 0;
    for (let i = 0; i < this.ticketsPerCategory.length; i++) {
      s += this.ticketsPerCategory[i] * this.standingCategories[i].price;
    }
    return s;
  }

  protected readonly formatDate = formatDate;
}
