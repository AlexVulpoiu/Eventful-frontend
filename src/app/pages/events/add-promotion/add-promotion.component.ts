import {Component, OnInit} from '@angular/core';
import {MatFormField, MatError, MatLabel, MatFormFieldModule} from "@angular/material/form-field";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {MY_FORMATS} from "../add-event/add-event.component";
import {EventService} from "../../../services/event.service";
import {AddPromotionDto} from "../../../dto/events/add-promotion-dto";
import {EventPromotionService} from "../../../services/event-promotion.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-promotion',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatLabel,
    MatDialogContent,
    ReactiveFormsModule,
    MatDatepicker,
    MatDatepickerToggle,
    MatDialogActions,
    MatDatepickerInput,
    MatDatetimepickerModule,
    MatInput,
    MatButton,
    MatDialogClose,
    NgIf,
    MatDialogTitle
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
  templateUrl: './add-promotion.component.html',
  styleUrl: './add-promotion.component.scss'
})
export class AddPromotionComponent implements OnInit {

  promotionForm: FormGroup;
  eventId: number = 0;
  limitDate: Date = new Date();
  tomorrow: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<AddPromotionComponent>,
    private fb: FormBuilder,
    private eventService: EventService,
    private eventPromotionService: EventPromotionService, private notificationService: NotificationService, private router: Router
  ) {
    this.promotionForm = this.fb.group({
      value: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.eventPromotionService.getMessage.subscribe(data => {
      this.eventId = data.eventId;
      this.limitDate = data.limitDate;
      this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    });
  }

  onSave(): void {
    if (this.promotionForm.valid) {
      this.eventService.addPromotion(this.eventId, new AddPromotionDto(this.promotionForm.value.value, new Date(this.promotionForm.value.endDate.toString() + ' UTC')))
        .subscribe({
          next: () => {
            this.dialogRef.close(this.promotionForm.value);
            this.notificationService.showSuccess('The promotion was added successfully!');
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
}
