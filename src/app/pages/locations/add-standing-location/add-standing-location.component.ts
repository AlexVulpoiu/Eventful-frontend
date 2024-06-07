import {Component, OnInit} from '@angular/core';
import {FormsModule, Validators, ReactiveFormsModule, FormControl, FormGroup} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {LocationsService} from "../../../services/locations.service";
import {AddStandingLocationDto} from "../../../dto/locations/add-standing-location-dto";

@Component({
  selector: 'app-add-standing-location',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    RouterLink,
    NgIf
  ],
  templateUrl: './add-standing-location.component.html',
  styleUrl: './add-standing-location.component.scss'
})
export class AddStandingLocationComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    city: new FormControl('', [Validators.required, Validators.minLength(1)]),
    country: new FormControl('', [Validators.required, Validators.minLength(1)]),
    address: new FormControl('', [Validators.required, Validators.minLength(1)]),
    capacity: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  errorMessage = '';

  constructor(private locationService: LocationsService, private router: Router) {
  }

  ngOnInit() {

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
    this.locationService.addStandingLocation(
      new AddStandingLocationDto(this.form.value.name, this.form.value.city, this.form.value.country,
        this.form.value.address, this.form.value.capacity)
    ).subscribe(data => {
      console.log(data);
      this.router.navigate(['/events']);
    });
  }
}
