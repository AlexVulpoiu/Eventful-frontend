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
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

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
  displayedColumns = ['index', 'content', 'user', 'date'];
  roles: string[] = [];

  constructor(private feedbackService: FeedbackService, private notificationService: NotificationService, private tokenStorageService: TokenStorageService,
              private router: Router, @Inject(LOCALE_ID) public locale: string) {
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.roles = user.roles;
    }

    if (!this.roles.includes('MODERATOR') && !this.roles.includes('ADMIN')) {
      if (this.roles.includes('ORGANISER')) {
        this.router.navigate(['/events/all']);
      } else {
        this.router.navigate(['/events']);
      }
    }

    this.feedbackService.getFeedback().subscribe({
      next: data => {
        this.feedbackList = data;
      },
      error: err => {
        let message = typeof err.error === "string" ? err.error : 'Internal server error';
        let status = typeof err.status === "number" ? err.status : 500;

        if (status === 401 || status === 403) {
          if (this.roles.includes('ORGANISER')) {
            this.router.navigate(['/events/all']);
          } else {
            this.router.navigate(['/events']);
          }
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
