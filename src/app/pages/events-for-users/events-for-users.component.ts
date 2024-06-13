import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {NgApexchartsModule} from "ng-apexcharts";
import {formatDate, NgForOf, TitleCasePipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {TablerIconsModule} from "angular-tabler-icons";
import {EventService} from "../../services/event.service";
import {EventPreviewDto} from "../../dto/events/event-preview-dto";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-events-for-users',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatFormField,
    MatMiniFabButton,
    NgApexchartsModule,
    NgForOf,
    RouterLink,
    TablerIconsModule,
    TitleCasePipe,
    MatButton,
    FormsModule,
    MatIcon,
    MatInput,
    MatPaginator
  ],
  templateUrl: './events-for-users.component.html',
  styleUrls: ['./events-for-users.component.scss']
})
export class EventsForUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  search: string = '';
  events: EventPreviewDto[] = [];
  totalEvents: number = 0;
  pageSize: number = 9;
  currentPage: number = 0;

  constructor(private eventService: EventService,
              protected router: Router,
              @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEventsList(this.search, this.currentPage, this.pageSize).subscribe(res => {
      this.events = res.content;
      this.totalEvents = res.totalElements;
    });
  }

  onSearchChange(value: string) {
    this.search = value;
    this.currentPage = 0;
    this.paginator.firstPage();
    this.loadEvents();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.loadEvents();
  }

  protected readonly formatDate = formatDate;
}
