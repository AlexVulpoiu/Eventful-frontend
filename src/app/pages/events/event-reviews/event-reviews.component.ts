import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {EventReviewsService} from "../../../services/event-reviews-service";
import {ReviewDetailsDto} from "../../../dto/reviews/review-details-dto";
import {formatDate, NgForOf} from "@angular/common";
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
  selector: 'app-event-reviews',
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
    NgForOf,
    MatHeaderCellDef
  ],
  templateUrl: './event-reviews.component.html',
  styleUrl: './event-reviews.component.scss'
})
export class EventReviewsComponent implements OnInit {

  displayedColumns: string[] = ['text', 'dateTime'];
  reviews: ReviewDetailsDto[] = [];

  constructor(public dialogRef: MatDialogRef<EventReviewsComponent>, private eventReviewsService: EventReviewsService,
              @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit(): void {
    this.eventReviewsService.getMessage.subscribe(data => this.reviews = data);
  }

  protected readonly formatDate = formatDate;
}
