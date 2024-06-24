import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import { UserSignupRequest } from 'src/app/dto/auth/user-signup-request';
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s-]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s-]+$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]]
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      let form = this.signUpForm.value;
      this.authService.registerUser(new UserSignupRequest(form.email, form.firstName, form.lastName, form.password))
        .subscribe({
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
