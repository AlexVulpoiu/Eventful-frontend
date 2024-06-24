import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../../dto/auth/login-request";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({});
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router,
              private fb: FormBuilder, private notificationService: NotificationService) {
    let message = localStorage.getItem('login-page-message');
    if (message != null && message.length > 0) {
      this.notificationService.showInfo(message);
      localStorage.removeItem('login-page-message');
    }
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/events']);
    }
  }

  onSubmit(): void {

    if (this.signInForm.valid) {
      this.authService.login(new LoginRequest(this.signInForm.value.email, this.signInForm.value.password)).subscribe({
        next: data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['/events']);
        },
        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          if (typeof err.status === "number" && 400 <= err.status && err.status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
          this.isLoginFailed = true;
        }
      });
    }
  }
}
