import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {Router} from "@angular/router";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
import { environment } from 'src/environments/environment';
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDatetimeModule} from "@mat-datetimepicker/moment";
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOption} from "@angular/material/core";
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatSelect} from "@angular/material/select";
import {AddStandingCategoryComponent} from "../add-standing-category/add-standing-category.component";
import {MatIcon} from "@angular/material/icon";
import {TablerIconsModule} from "angular-tabler-icons";
import {AddCharitableCauseDto} from "../../../dto/charitable-causes/add-charitable-cause-dto";
import {AddCategoryPriceDto} from "../../../dto/events/add-category-price-dto";

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

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    description: new FormControl('', [Validators.required, Validators.minLength(1)]),
    startDate: new FormControl(new Date(), [Validators.required]),
    endDate: new FormControl(new Date(), [Validators.required]),
    preparationTime: new FormControl(1, [Validators.required, Validators.min(1)]),
    feeSupporter: new FormControl('', [Validators.required, Validators.minLength(1)]),
    location: new FormControl(null, [Validators.required]),
    image: new FormControl('', [Validators.required]),
    charityPercentage: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    charitableCauseName: new FormControl(''),
    charitableCauseDescription: new FormControl(''),
    neededAmount: new FormControl(0),
    categoriesPrices: new FormArray([]),
    standingCategories: new FormArray([]),
  });

  constructor(private eventsService: EventService, private locationService: LocationsService, private router: Router,
              private formBuilder: FormBuilder) {

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

    console.log(event.value);
    const selectedLocation = event.value;
    if (selectedLocation.categories && selectedLocation.categories.length > 0) {
      selectedLocation.categories.forEach((category: any) => {
        this.categoriesPrices.push(this.formBuilder.group({
          category: category.name,
          price: new FormControl(0, Validators.required),
        }))
      })
    }
  }

  get categoriesPrices() {
    return this.form.get('categoriesPrices') as FormArray;
  }

  onSubmit() {
    let charitableCause = new AddCharitableCauseDto(this.form.value.charitableCauseName,
      this.form.value.charitableCauseDescription, this.form.value.neededAmount);
    let prices = this.form.value.categoriesPrices;
    let pricesPerCategory: AddCategoryPriceDto[] = [];
    let location = this.form.value.location;
    for (let i = 0; i < location.categoriesIds.length; i++) {
      pricesPerCategory.push(new AddCategoryPriceDto(location.categoriesIds[i], prices[i].price));
    }

    this.eventsService.addEvent(new AddEventDto(this.form.value.name, this.form.value.description,
      this.form.value.startDate, this.form.value.endDate, this.form.value.preparationTime, this.form.value.feeSupporter,
      this.form.value.charityPercentage, this.form.value.location.id, charitableCause,
      pricesPerCategory, this.form.value.standingCategories)
    ).subscribe(id => {
      this.eventsService.updateLogo(id, this.formData)
        .subscribe(() => this.router.navigate(['events', id]))
    });
  }

  onClick() {
    console.log(this.form.value.name);
    console.log(this.form.value.description);
    console.log(this.form.value.startDate);
    console.log(this.form.value.endDate);
    console.log(this.form.value.preparationTime);
    console.log(this.form.value.location);
  }

  handleFileInputChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.formData.delete('logo');
      this.formData.append('logo', file);
      this.form.patchValue({image: file});
    }
  }

  protected readonly environment = environment;
}
