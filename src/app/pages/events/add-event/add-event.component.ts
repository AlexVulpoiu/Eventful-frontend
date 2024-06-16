import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {Router} from "@angular/router";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {AddEventDto} from "../../../dto/events/add-event-dto";
import {LocationDetailsDto} from "../../../dto/locations/location-details-dto";
import {LocationsService} from "../../../services/locations.service";
import {AddSeatsCategoryComponent} from "../../locations/add-seats-category/add-seats-category.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {NgForOf, NgIf} from "@angular/common";
import {environment} from 'src/environments/environment';
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDatetimeModule} from "@mat-datetimepicker/moment";
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {AddStandingCategoryComponent} from "../add-standing-category/add-standing-category.component";
import {MatIcon} from "@angular/material/icon";
import {TablerIconsModule} from "angular-tabler-icons";
import {AddCharitableCauseDto} from "../../../dto/charitable-causes/add-charitable-cause-dto";
import {AddCategoryPriceDto} from "../../../dto/events/add-category-price-dto";
import * as moment from "moment";

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

export function charitableCauseValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const causeName = group.get('charitableCauseName')?.value;
    const causeDescription = group.get('charitableCauseDescription')?.value;
    const neededAmount = group.get('neededAmount')?.value;
    const charityPercentage = group.get('charityPercentage')?.value;

    const isCauseFilled = !!causeName || !!causeDescription || neededAmount > 0 || charityPercentage > 0;
    const isCauseComplete = causeName && causeDescription && neededAmount > 0 && charityPercentage > 0;

    if (isCauseFilled && !isCauseComplete) {
      return { charityIncomplete: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    AddSeatsCategoryComponent,
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    MatInputModule,
    MatLabel,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NgForOf,
    ReactiveFormsModule,
    EditorComponent,
    MatDatepickerModule,
    MatDialogModule,
    MatMomentDateModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    MatSelect,
    MatOption,
    NgIf,
    AddStandingCategoryComponent,
    MatIcon,
    MatIconButton,
    TablerIconsModule,
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AddEventComponent implements OnInit {

  locations: LocationDetailsDto[] = [];
  description = "";
  formData= new FormData();
  today: Date = new Date();

  form: FormGroup = this.formBuilder.group({});

  constructor(private eventsService: EventService, private locationService: LocationsService, private router: Router,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      startDate: [moment().startOf('day').add(1, 'days').toDate(), [Validators.required]],
      endDate: [moment().startOf('day').add(1, 'days').toDate(), [Validators.required]],
      preparationTime: [1, [Validators.required, Validators.min(1)]],
      feeSupporter: ['', [Validators.required, Validators.minLength(1)]],
      location: [null, [Validators.required]],
      logo: ['', [Validators.required]],
      charityPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      charitableCauseName: [''],
      charitableCauseDescription: [''],
      neededAmount: [0],
      categoriesPrices: this.formBuilder.array([]),
      standingCategories: this.formBuilder.array([]),
    }, { validators: charitableCauseValidator() });
  }

  ngOnInit() {
    this.locationService.getAllLocations('').subscribe(
      data => this.locations = data
    );
  }

  get standingCategories(): FormArray {
    return this.form.get('standingCategories') as FormArray;
  }

  addStandingCategory() {
    const standingCategoryGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      capacity: new FormControl(1, [Validators.required, Validators.min(1)]),
      price: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
    this.standingCategories.push(standingCategoryGroup);
  }

  deleteStandingCategory() {
    if (this.standingCategories.length > 0) {
      this.standingCategories.removeAt(this.standingCategories.length - 1);
    }
  }

  modelChangeFn(e: string) {
    this.description = e;
    this.form.value.description = e;
  }

  onLocationChange(event: any) {
    const categoriesPricesArray = this.form.get('categoriesPrices') as FormArray;
    categoriesPricesArray.clear();

    const selectedLocation = event.value;
    console.log(selectedLocation);
    if (selectedLocation.categories && selectedLocation.categories.length > 0) {
      selectedLocation.categories.forEach((category: any) => {
        this.categoriesPrices.push(this.formBuilder.group({
          category: category.name,
          price: new FormControl(1, [Validators.required, Validators.min(1)]),
          capacity: new FormControl(1, [Validators.required, Validators.min(1)]),
        }));
      });
    }
  }

  get categoriesPrices() {
    return this.form.get('categoriesPrices') as FormArray;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const event: AddEventDto = this.form.value;

    event.description = this.form.get('description')?.value;

    const startDateValue = this.form.get('startDate')?.value;
    const endDateValue = this.form.get('endDate')?.value;

    if (moment(startDateValue).isBefore(moment()) || moment(endDateValue).isBefore(moment())) {
      alert('Start date and End date must be in the future.');
      return;
    }

    if (moment(endDateValue).isBefore(startDateValue)) {
      alert('End date must be after start date!');
      return;
    }

    event.startDate = new Date(startDateValue.toString() + ' UTC');
    event.endDate = new Date(endDateValue.toString() + ' UTC');
    event.locationId = this.form.get('location')?.value.id;

    event.addCharitableCause = new AddCharitableCauseDto(this.form.get('charitableCauseName')?.value,
      this.form.get('charitableCauseDescription')?.value, this.form.get('neededAmount')?.value);

    const standingCategoriesArray = this.form.get('standingCategories') as FormArray;
    const totalCapacity = standingCategoriesArray.controls.reduce((sum, control) => sum + control.get('capacity')?.value, 0);
    if (this.form.get('location')?.value.categories.length == 0 && totalCapacity !== this.form.get('location')?.value.capacity) {
      alert('Total capacity of all categories must equal the location capacity: ' + this.form.get('location')?.value.capacity);
      return;
    }

    const categoriesPricesArray = this.form.get('categoriesPrices') as FormArray;
    let categoriesPricesForEvent: AddCategoryPriceDto[] = [];
    let location = this.form.get('location')?.value;
    for (let i = 0; i < categoriesPricesArray.value.length; i++) {
      categoriesPricesForEvent.push(new AddCategoryPriceDto(location.categoriesIds[i], categoriesPricesArray.value[i].price));
    }
    event.categoriesPrices = categoriesPricesForEvent;

    this.eventsService.addEvent(event).subscribe(
      id => {
        this.eventsService.updateLogo(id, this.formData)
          .subscribe(() => this.router.navigate(['events', id]));
      }
    );
  }

  checkDates() {
    const startDateValue = this.form.get('startDate')?.value;
    const endDateValue = this.form.get('endDate')?.value;

    if (moment(startDateValue).isBefore(moment()) || moment(endDateValue).isBefore(moment())) {
      alert('Start date and End date must be in the future.');
      return;
    }

    if (moment(endDateValue).isBefore(startDateValue)) {
      alert('End date must be after start date!');
      return;
    }
  }

  checkCategoriesCapacity() {
    const standingCategoriesArray = this.form.get('standingCategories') as FormArray;
    const totalCapacity = standingCategoriesArray.controls.reduce((sum, control) => sum + control.get('capacity')?.value, 0);
    if (this.form.get('location')?.value.categories.length == 0 && totalCapacity !== this.form.get('location')?.value.capacity) {
      alert('Total capacity of all categories must equal the location capacity: ' + this.form.get('location')?.value.capacity);
      return;
    }
  }

  onClick() {
    if (this.form.valid) {
      console.log('Form values:', this.form.value);
    }
  }

  handleFileInputChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formData.append("logo", file);
      this.form.get('logo')?.setValue(file.name);
    }
  }

  protected readonly environment = environment;
}
