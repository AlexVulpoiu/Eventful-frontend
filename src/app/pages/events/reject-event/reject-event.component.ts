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
    private fb: FormBuilder
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
        data => console.log(data)
      );
      this.dialogRef.close(this.rejectionForm.value);
    }
  }
}
