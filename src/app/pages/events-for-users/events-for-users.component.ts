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
import {MatTooltip} from "@angular/material/tooltip";
import {NotificationService} from "../../services/notification.service";
import {TokenStorageService} from "../../services/token-storage.service";

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
    MatPaginator,
    MatTooltip
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
  roles: string[] = [];

  constructor(private eventService: EventService, private notificationService: NotificationService,
              protected router: Router, private tokenStorageService: TokenStorageService,
              @Inject(LOCALE_ID) public locale: string) {
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.roles = user.roles;
    }

    if (this.roles.length > 0 && !this.roles.includes('USER')) {
      this.router.navigate(['/events/all']);
    }
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEventsList(this.search, this.currentPage, this.pageSize).subscribe({
      next: res => {
        this.events = res.content;
        this.totalEvents = res.totalElements;
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
