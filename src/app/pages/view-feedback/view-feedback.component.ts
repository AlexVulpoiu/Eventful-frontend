import {Component, Inject, LOCALE_ID} from '@angular/core';
import {FeedbackService} from "../../services/feedback.service";
import {FeedbackDto} from "../../dto/feedback/feedback-dto";
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
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-view-feedback',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './view-feedback.component.html',
  styleUrl: './view-feedback.component.scss'
})
export class ViewFeedbackComponent {

  feedbackList: FeedbackDto[] = [];
  displayedColumns = ['index', 'content', 'user', 'date']

  constructor(private feedbackService: FeedbackService, @Inject(LOCALE_ID) public locale: string) {
    this.feedbackService.getFeedback().subscribe(data => this.feedbackList = data);
  }

  protected readonly formatDate = formatDate;
}
