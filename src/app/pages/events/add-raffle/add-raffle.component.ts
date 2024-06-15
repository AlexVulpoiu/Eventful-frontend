import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  templateUrl: './add-raffle.component.html',
  styleUrl: './add-raffle.component.scss'
})
export class AddRaffleComponent implements OnInit {

  raffleForm: FormGroup;
  eventId: number = 0;
  limitDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<AddRaffleComponent>, private fb: FormBuilder,
              private eventService: EventService, private eventRaffleService: EventRaffleService) {
    this.raffleForm = this.fb.group({
      participantsLimit: [null, []],
      endDate: [null, []],
      prize: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      partnerName: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.eventRaffleService.getMessage.subscribe(data => {
      this.eventId = data.eventId;
      this.limitDate = data.eventLimit;
    })
  }

  onSave() {
    if (this.raffleForm.valid) {
      this.eventService.addRaffle(this.eventId, new AddRaffleDto(this.raffleForm.value.participantsLimit,
        this.raffleForm.value.endDate, this.raffleForm.value.prize, this.raffleForm.value.partnerName))
        .subscribe(data => console.log(data));
      this.dialogRef.close(this.raffleForm.value);
    }
  }
}
