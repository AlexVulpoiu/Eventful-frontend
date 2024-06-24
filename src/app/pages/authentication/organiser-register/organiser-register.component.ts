import {Component} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {AuthService} from "../../../services/auth.service";
import {LegalPersonSignupRequest} from "../../../dto/auth/legal-person-signup-request";
import {MatCard, MatCardContent} from "@angular/material/card";
import {Router, RouterLink} from "@angular/router";
import {PersonSignupRequest} from "../../../dto/auth/person-signup-request";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-organiser-register',
  standalone: true,
  imports: [
    MatStep,
    ReactiveFormsModule,
    MatStepper,
    MatFormField,
    MatError,
    MatLabel,
    MatStepLabel,
    MatInput,
    NgIf,
    MatButton,
    MatStepperNext,
    MatStepperPrevious,
    MatRadioButton,
    MatRadioGroup,
    MatCard,
    MatCardContent,
    RouterLink
  ],
  templateUrl: './organiser-register.component.html',
  styleUrl: './organiser-register.component.scss'
})
export class OrganiserRegisterComponent {
  isLinear = true;
  generalInfoFormGroup: FormGroup = new FormGroup({});
  addressInfoFormGroup: FormGroup = new FormGroup({});
  bankDetailsFormGroup: FormGroup = new FormGroup({});
  organisationDetailsFormGroup: FormGroup = new FormGroup({});
  legalPerson = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.generalInfoFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s-]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s-]+$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]]
    });

    this.addressInfoFormGroup = this.fb.group({
      country: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      building: ['', Validators.required],
      zipcode: ['', Validators.required]
    });

    this.bankDetailsFormGroup = this.fb.group({
      bank: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      iban: ['', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]]
    });

    this.organisationDetailsFormGroup = this.fb.group({
      commerceRegistrationNumber: ['', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]],
      isLegalPerson: ['no', Validators.required],
      cui: ['', Validators.pattern('^[0-9]+$')],
      legalName: ['', Validators.pattern('^[a-zA-Z\\s-]+$')],
      pin: ['', Validators.pattern('^[0-9]{13}$')]
    });
  }

  onLegalPersonChange(event: { value: string; }): void {
    this.legalPerson = event.value === 'yes';
    if (this.legalPerson) {
      this.organisationDetailsFormGroup.get('cui')?.setValidators([Validators.required, Validators.min(1)]);
      this.organisationDetailsFormGroup.get('legalName')?.setValidators([Validators.required, Validators.minLength(1)]);
      this.organisationDetailsFormGroup.get('pin')?.clearValidators();
    } else {
      this.organisationDetailsFormGroup.get('cui')?.clearValidators();
      this.organisationDetailsFormGroup.get('legalName')?.clearValidators();
      this.organisationDetailsFormGroup.get('pin')?.setValidators([Validators.required, Validators.pattern('^[0-9]{13}$')]);
    }
    this.organisationDetailsFormGroup.get('cui')?.updateValueAndValidity();
    this.organisationDetailsFormGroup.get('legalName')?.updateValueAndValidity();
    this.organisationDetailsFormGroup.get('pin')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.generalInfoFormGroup.valid && this.addressInfoFormGroup.valid && this.bankDetailsFormGroup.valid && this.organisationDetailsFormGroup.valid) {
      const formValues = {
        ...this.generalInfoFormGroup.value,
        ...this.addressInfoFormGroup.value,
        ...this.bankDetailsFormGroup.value,
        ...this.organisationDetailsFormGroup.value
      };

      if (this.legalPerson) {
        this.authService.registerLegalPerson(
          new LegalPersonSignupRequest(formValues.email, formValues.firstName, formValues.lastName, formValues.password,
            formValues.country, formValues.district, formValues.city, formValues.street, formValues.building, formValues.zipcode,
            formValues.bank, formValues.iban,
            formValues.commerceRegistrationNumber, formValues.cui, formValues.legalName)
        ).subscribe({
          next: () => {
            localStorage.setItem('login-page-message', "Your account has been created and a confirmation email was sent. Please login after email confirmation.");
            this.router.navigate(['/authentication/login']);
          },

          error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            if (typeof err.status === "number" && 400 <= err.status && err.status < 500) {
              this.notificationService.showWarning(message);
            } else {
              this.notificationService.showError(message);
            }
          }
        });
      } else {
        this.authService.registerPerson(
          new PersonSignupRequest(formValues.email, formValues.firstName, formValues.lastName, formValues.password,
            formValues.country, formValues.district, formValues.city, formValues.street, formValues.building, formValues.zipcode,
            formValues.bank, formValues.iban,
            formValues.commerceRegistrationNumber, formValues.pin)
        ).subscribe({
          next: () => {
            localStorage.setItem('login-page-message', "Your account has been created and a confirmation email was sent. Please login after email confirmation.");
            this.router.navigate(['/authentication/login']);
          },

          error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            if (typeof err.status === "number" && 400 <= err.status && err.status < 500) {
              this.notificationService.showWarning(message);
            } else {
              this.notificationService.showError(message);
            }
          }
        });
      }
    }
  }
}
