import {Component, OnInit} from '@angular/core';
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperModule,
  MatStepperNext,
  MatStepperPrevious
} from "@angular/material/stepper";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from "@angular/forms";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {LocationsService} from "../../../services/locations.service";
import {Router} from "@angular/router";
import {AddSeatsCategoryComponent} from "../add-seats-category/add-seats-category.component";
import {NgForOf, NgIf} from "@angular/common";
import {AddSeatedLocationDto} from "../../../dto/locations/add-seated-location-dto";



export function maxValidator(maxControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const maxValue = maxControl.value;
    if (control.value !== null && control.value > maxValue) {
      return { max: { maxValue: maxValue, actualValue: control.value } };
    }
    return null;
  };
}


@Component({
  selector: 'app-add-seated-location',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepper,
    MatLabel,
    MatStep,
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatStepperPrevious,
    MatStepperNext,
    MatStepLabel,
    MatInput,
    MatError,
    AddSeatsCategoryComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-seated-location.component.html',
  styleUrl: './add-seated-location.component.scss'
})
export class AddSeatedLocationComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private locationService: LocationsService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      numberOfRows: ['', [Validators.required, Validators.min(1)]],
      country: ['', Validators.required],
      address: ['', Validators.required],
      seatsPerRow: ['', [Validators.required, Validators.min(1)]],
      seatsPerCategory: this.fb.array([])
    });
  }

  ngOnInit() {

  }


  get seatsPerCategory() {
    return this.form.get('seatsPerCategory') as FormArray;
  }

  addCategory(): void {
    const numberOfRowsControl = this.form.get('numberOfRows');
    const seatsPerRowControl = this.form.get('seatsPerRow');

    const categoryGroup = this.fb.group({
      name: ['', Validators.required],
      minRow: [1, [Validators.required, Validators.min(1), maxValidator(numberOfRowsControl!)]],
      maxRow: [1, [Validators.required, Validators.min(1), maxValidator(numberOfRowsControl!)]],
      minSeat: [1, [Validators.required, Validators.min(1), maxValidator(seatsPerRowControl!)]],
      maxSeat: [1, [Validators.required, Validators.min(1), maxValidator(seatsPerRowControl!)]],
    });

    this.seatsPerCategory.push(categoryGroup);
  }

  deleteCategory(): void {
    this.seatsPerCategory.removeAt(this.seatsPerCategory.length - 1);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      if (this.validateCategories(formValues.numberOfRows, formValues.seatsPerRow, formValues.seatsPerCategory)) {
        this.locationService.addSeatedLocation(
          new AddSeatedLocationDto(this.form.value.name, this.form.value.city, this.form.value.country,
            this.form.value.address, this.form.value.numberOfRows, this.form.value.seatsPerRow, this.form.value.seatsPerCategory)
        ).subscribe(data => {
          this.router.navigate(['/locations']);
        });
      } else {
        alert("The categories don't cover all seats or there is overlapping!");
      }
    }
  }

  private validateCategories(numberOfRows: number, seatsPerRow: number, categories: any[]): boolean {
    const seatMatrix = Array.from({ length: numberOfRows }, () => Array(seatsPerRow).fill(false));

    for (const category of categories) {
      for (let row = category.minRow - 1; row < category.maxRow; row++) {
        for (let seat = category.minSeat - 1; seat < category.maxSeat; seat++) {
          if (seatMatrix[row][seat]) {
            return false;  // Overlap detected
          }
          seatMatrix[row][seat] = true;
        }
      }
    }

    return seatMatrix.every(row => row.every(seat => seat));
  }
}
