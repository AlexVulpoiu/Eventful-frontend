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
import {TokenStorageService} from "../../../services/token-storage.service";
import {NotificationService} from "../../../services/notification.service";

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
  roles: string[] = [];

  constructor(private fb: FormBuilder, private locationService: LocationsService, private router: Router,
              private tokenStorageService: TokenStorageService, private notificationService: NotificationService) {
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.roles = user.roles;
    }

    if (!this.roles.includes('MODERATOR') && !this.roles.includes('ADMIN')) {
      if (this.roles.includes('ORGANISER')) {
        this.router.navigate(['/events/all']);
      } else {
        this.router.navigate(['/events']);
      }
    }
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
    ).subscribe(
      {
        next: () => {
          localStorage.setItem('locations-page-message', 'Standing location added successfully!');
          this.router.navigate(['/locations']);
        },
        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            if (this.roles.includes('ORGANISER')) {
              this.router.navigate(['/events/all']);
            } else {
              this.router.navigate(['/events']);
            }
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      }
    );
  }
}
