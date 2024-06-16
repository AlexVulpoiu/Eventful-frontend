import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {EventOrderDto} from "../../../dto/orders/event-orders-dto";
import {MatDialogRef} from "@angular/material/dialog";
import {EventOrdersService} from "../../../services/event-orders-service";
import {formatDate, NgIf} from '@angular/common';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-event-orders',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    NgIf
  ],
  templateUrl: './event-orders.component.html',
  styleUrl: './event-orders.component.scss'
})
export class EventOrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'orderDate', 'total', 'tickets'];
  eventOrdersDto: EventOrderDto | undefined;

  constructor(public dialogRef: MatDialogRef<EventOrdersComponent>, private eventOrdersService: EventOrdersService,
              @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit() {
    this.eventOrdersService.getMessage.subscribe(data => this.eventOrdersDto = data);
  }

  protected readonly formatDate = formatDate;
}
