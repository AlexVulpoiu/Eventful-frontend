import {Component, OnInit} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatError, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {EventRejectService} from "../../../services/event-reject.service";
import {EventService} from "../../../services/event.service";
import {ChangeEventStatusDto} from "../../../dto/events/change-event-status-dto";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reject-event',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatLabel,
    NgIf,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './reject-event.component.html',
  styleUrl: './reject-event.component.scss'
})
export class RejectEventComponent implements OnInit {

  rejectionForm: FormGroup;
  eventId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<RejectEventComponent>,
    private eventService: EventService,
    private eventRejectService: EventRejectService,
    private fb: FormBuilder, private notificationService: NotificationService, private router: Router
  ) {
    this.rejectionForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.eventRejectService.getMessage.subscribe(data => this.eventId = data.eventId);
  }

  onReject(): void {
    if (this.rejectionForm.valid) {
      this.eventService.updateEventStatus(this.eventId, new ChangeEventStatusDto('REJECTED', this.rejectionForm.value.reason)).subscribe(
        {
          next: () => {
            this.dialogRef.close(this.rejectionForm.value);
            this.notificationService.showInfo('The event was rejected!');
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
        }
      );
    }
  }
}
