import {Component, OnInit} from '@angular/core';
import {FormsModule, Validators, ReactiveFormsModule, FormControl, FormGroup, FormBuilder} from "@angular/forms";
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

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private locationService: LocationsService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    this.locationService.addStandingLocation(
      new AddStandingLocationDto(this.form.value.name, this.form.value.city, this.form.value.country,
        this.form.value.address, this.form.value.capacity)
    ).subscribe(data => {
      console.log(data);
      this.router.navigate(['/locations']);
    });
  }
}
