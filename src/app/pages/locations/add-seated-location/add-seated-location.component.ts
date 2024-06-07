import {Component, OnInit} from '@angular/core';
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperModule,
  MatStepperNext,
  MatStepperPrevious
} from "@angular/material/stepper";
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {LocationsService} from "../../../services/locations.service";
import {Router} from "@angular/router";
import {AddSeatsCategoryComponent} from "../add-seats-category/add-seats-category.component";
import {NgForOf} from "@angular/common";
import {AddSeatedLocationDto} from "../../../dto/locations/add-seated-location-dto";

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
    NgForOf
  ],
  templateUrl: './add-seated-location.component.html',
  styleUrl: './add-seated-location.component.scss'
})
export class AddSeatedLocationComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    city: new FormControl('', [Validators.required, Validators.minLength(1)]),
    country: new FormControl('', [Validators.required, Validators.minLength(1)]),
    address: new FormControl('', [Validators.required, Validators.minLength(1)]),
    numberOfRows: new FormControl(1, [Validators.required, Validators.min(1)]),
    seatsPerRow: new FormControl(1, [Validators.required, Validators.min(1)]),
    seatsPerCategory: new FormArray([])
  });

  errorMessage = '';

  constructor(private locationService: LocationsService, private router: Router) {
  }

  ngOnInit() {

  }

  get seatsPerCategory(): FormArray {
    return this.form.get('seatsPerCategory') as FormArray;
  }

  addCategory() {
    const categoryGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      minRow: new FormControl(1, [Validators.required, Validators.min(1)]),
      maxRow: new FormControl(1, [Validators.required, Validators.min(1)]),
      minSeat: new FormControl(1, [Validators.required, Validators.min(1)]),
      maxSeat: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
    this.seatsPerCategory.push(categoryGroup);
  }

  deleteCategory() {
    if (this.seatsPerCategory.length > 0) {
      this.seatsPerCategory.removeAt(this.seatsPerCategory.length - 1);
    }
  }

  updateErrorMessage() {
    if (this.form.controls['name'].hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.form.controls['name'].hasError('minLength')) {
      this.errorMessage = 'Name should have at least 1 character';
    } else {
      this.errorMessage = '';
    }
  }

  onSubmit(): void {
    console.log(this.form.value.seatsPerCategory);
    this.locationService.addSeatedLocation(
      new AddSeatedLocationDto(this.form.value.name, this.form.value.city, this.form.value.country,
        this.form.value.address, this.form.value.numberOfRows, this.form.value.seatsPerRow, this.form.value.seatsPerCategory)
    ).subscribe(data => {
      console.log(data);
      this.router.navigate(['/events']);
    });
  }
}
