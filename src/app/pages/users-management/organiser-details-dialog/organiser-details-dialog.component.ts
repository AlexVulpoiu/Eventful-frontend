import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {OrganiserProfileDto} from "../../../dto/profile/organiser-profile-dto";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {OrganiserService} from "../../../services/organiser.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-organiser-details-dialog',
  standalone: true,
  imports: [
    NgIf,
    MatDialogContent,
    MatButton,
    MatDialogActions
  ],
  templateUrl: './organiser-details-dialog.component.html',
  styleUrl: './organiser-details-dialog.component.scss'
})
export class OrganiserDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<OrganiserDetailsDialogComponent>,
              private organiserService: OrganiserService, private notificationService: NotificationService,
              private router: Router, @Inject(MAT_DIALOG_DATA) public data: OrganiserProfileDto) {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onApprove(data: OrganiserProfileDto) {
    this.organiserService.updateOrganiserStatus(data.id, 'ACCEPTED')
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.notificationService.showInfo('The organiser status was changed to ACCEPTED!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.dialogRef.close();
            this.router.navigate(['/organisers']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      });
  }

  onReject(data: OrganiserProfileDto) {
    this.organiserService.updateOrganiserStatus(data.id, 'REJECTED')
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.notificationService.showInfo('The organiser status was changed to REJECTED!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.dialogRef.close();
            this.router.navigate(['/organisers']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      });
  }
}
