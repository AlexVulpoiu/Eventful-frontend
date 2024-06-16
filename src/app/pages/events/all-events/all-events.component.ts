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

  constructor(private eventService: EventService, protected router: Router,
              @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEventsByStatusAndEndDate('ACCEPTED', false)
      .subscribe(events => this.acceptedEvents = events);
    this.eventService.getEventsByStatusAndEndDate('REJECTED', false)
      .subscribe(events => this.rejectedEvents = events);
    this.eventService.getEventsByStatusAndEndDate('PENDING', false)
      .subscribe(events => this.pendingEvents = events);
    this.eventService.getEventsByStatusAndEndDate('ACCEPTED', true)
      .subscribe(events => this.endedEvents = events);
  }

  protected readonly formatDate = formatDate;
}
