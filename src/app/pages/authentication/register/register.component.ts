import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import { UserSignupRequest } from 'src/app/dto/auth/user-signup-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {}

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
        .subscribe(() => this.router.navigate(['/authentication/login']));
    }
  }
}
