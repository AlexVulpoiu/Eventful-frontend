import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {EventPreviewDto} from "../../../dto/events/event-preview-dto";
import {EventService} from "../../../services/event.service";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {TablerIconsModule} from "angular-tabler-icons";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    NgForOf,
    MatCardContent,
    MatCardImage,
    MatMiniFabButton,
    MatTooltip,
    TablerIconsModule,
    NgIf
  ],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.scss'
})
export class AllEventsComponent implements OnInit {
  acceptedEvents: EventPreviewDto[] = [];
  rejectedEvents: EventPreviewDto[] = [];
  pendingEvents: EventPreviewDto[] = [];
  endedEvents: EventPreviewDto[] = [];

  constructor(private eventService: EventService, protected router: Router, private notificationService: NotificationService,
              @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEventsByStatusAndEndDate('ACCEPTED', false)
      .subscribe({
        next: events => {
          this.acceptedEvents = events;
        },

        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.router.navigate(['/events']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      });
    this.eventService.getEventsByStatusAndEndDate('REJECTED', false)
      .subscribe({
        next: events => {
          this.rejectedEvents = events;
        },

        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.router.navigate(['/events']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      });
    this.eventService.getEventsByStatusAndEndDate('PENDING', false)
      .subscribe({
        next: events => {
          this.pendingEvents = events;
        },

        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.router.navigate(['/events']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      });
    this.eventService.getEventsByStatusAndEndDate('ACCEPTED', true)
      .subscribe({
        next: events => {
          this.endedEvents = events;
        },

        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.router.navigate(['/events']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      });
  }

  protected readonly formatDate = formatDate;
}
