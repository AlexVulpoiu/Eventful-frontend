import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {EventService} from "../../../services/event.service";
import {EventRaffleService} from "../../../services/event-raffle.service";
import {AddRaffleDto} from "../../../dto/events/add-raffle-dto";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {MY_FORMATS} from "../add-event/add-event.component";
import {NotificationService} from 'src/app/services/notification.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-raffle',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    NgIf,
    ReactiveFormsModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
  templateUrl: './add-raffle.component.html',
  styleUrl: './add-raffle.component.scss'
})
export class AddRaffleComponent implements OnInit {

  raffleForm: FormGroup;
  eventId: number = 0;
  tomorrow: Date = new Date();
  limitDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<AddRaffleComponent>, private fb: FormBuilder,
              private eventService: EventService, private eventRaffleService: EventRaffleService,
              private notificationService: NotificationService, private router: Router) {
    this.raffleForm = this.fb.group({
      participantsLimit: [null, []],
      endDate: [null, []],
      prize: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      partnerName: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.eventRaffleService.getMessage.subscribe(data => {
      this.eventId = data.eventId;
      this.limitDate = data.limitDate;
      this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    });

    this.raffleForm = this.fb.group({
      participantsLimit: [null, [Validators.min(0)]],
      endDate: [null],
      prize: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      partnerName: ['', [Validators.required]]
    }, {validators: this.participantsOrEndDateValidator});
  }

  participantsOrEndDateValidator(control: AbstractControl): ValidationErrors | null {
    const participantsLimit = control.get('participantsLimit')?.value;
    const endDate = control.get('endDate')?.value;

    if ((participantsLimit && endDate) || (!participantsLimit && !endDate)) {
      return {bothValuesProvided: true};
    }

    return null;
  }

  onSave() {
    if (this.raffleForm.valid) {
      let raffleDate = null;
      if (this.raffleForm.value.endDate != undefined) {
        raffleDate = new Date(this.raffleForm.value.endDate.toString() + ' UTC');
      }
      this.eventService.addRaffle(this.eventId, new AddRaffleDto(this.raffleForm.value.participantsLimit,
        raffleDate, this.raffleForm.value.prize, this.raffleForm.value.partnerName))
        .subscribe({
          next: () => {
            this.dialogRef.close(this.raffleForm.value);
            this.notificationService.showSuccess('The raffle was added successfully!');
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
