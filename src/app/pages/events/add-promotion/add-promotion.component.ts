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
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  templateUrl: './add-promotion.component.html',
  styleUrl: './add-promotion.component.scss'
})
export class AddPromotionComponent implements OnInit {

  promotionForm: FormGroup;
  eventId: number = 0;
  limitDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<AddPromotionComponent>,
    private fb: FormBuilder,
    private eventService: EventService,
    private eventPromotionService: EventPromotionService
  ) {
    this.promotionForm = this.fb.group({
      value: [null, [Validators.required, Validators.min(0)]],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.eventPromotionService.getMessage.subscribe(data => {
      this.eventId = data.eventId;
      this.limitDate = data.limitDate;
    });
  }

  onSave(): void {
    if (this.promotionForm.valid) {
      console.log(this.promotionForm.value);
      this.eventService.addPromotion(this.eventId, new AddPromotionDto(this.promotionForm.value.value, this.promotionForm.value.endDate))
        .subscribe(data => console.log(data));
      this.dialogRef.close(this.promotionForm.value);
    }
  }
}
