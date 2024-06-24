import {Component, OnInit} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {EventApproveService} from "../../../services/event-approve.service";
import {EventService} from "../../../services/event.service";
import {ChangeEventStatusDto} from "../../../dto/events/change-event-status-dto";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-approve-event',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './approve-event.component.html',
  styleUrl: './approve-event.component.scss'
})
export class ApproveEventComponent implements OnInit {

  eventId: number = 0;

  constructor(public dialogRef: MatDialogRef<ApproveEventComponent>, private eventApproveService: EventApproveService,
              private eventService: EventService, private notificationService: NotificationService, private router: Router) {

  }

  ngOnInit() {
    this.eventApproveService.getMessage.subscribe(data => this.eventId = data.eventId);
  }

  onApprove(): void {
    this.eventService.updateEventStatus(this.eventId, new ChangeEventStatusDto('ACCEPTED', ''))
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.notificationService.showInfo('The event was approved!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.dialogRef.close();
            this.router.navigate(['/events/all']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      });
  }
}
