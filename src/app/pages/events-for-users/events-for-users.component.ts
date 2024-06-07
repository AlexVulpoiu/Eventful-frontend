import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {NgApexchartsModule} from "ng-apexcharts";
import {formatDate, NgForOf, TitleCasePipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {TablerIconsModule} from "angular-tabler-icons";
import {EventsService} from "../../services/events.service";
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
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatMiniFabButton,
    MatOption,
    MatRow,
    MatRowDef,
    MatSelect,
    MatTable,
    MatTooltip,
    NgApexchartsModule,
    NgForOf,
    RouterLink,
    TablerIconsModule,
    TitleCasePipe,
    MatButton,
    FormsModule,
    MatIcon,
    MatInput
  ],
  templateUrl: './events-for-users.component.html',
  styleUrl: './events-for-users.component.scss'
})
export class EventsForUsersComponent implements OnInit {
  constructor(private eventService: EventsService,
              protected router: Router,
              @Inject(LOCALE_ID) public locale: string) {

  }

  search: string = '';
  events: EventPreviewDto[] = [];

  ngOnInit() {
    this.eventService.getEventsList('').subscribe(res => this.events = res);
  }

  onChange(value: string) {
    this.eventService.getEventsList(value).subscribe(res => this.events = res);
  }

  protected readonly formatDate = formatDate;
}
