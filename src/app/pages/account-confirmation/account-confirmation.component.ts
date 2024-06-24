import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-account-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './account-confirmation.component.html',
  styleUrl: './account-confirmation.component.scss'
})
export class AccountConfirmationComponent implements OnInit {
  code: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code');

    this.authService.confirmAccount(this.code!)
      .subscribe({
        next: () => {
          localStorage.setItem('login-page-message', "Your account has been confirmed. You can authenticate in the app now.");
          setTimeout(() => this.router.navigate(['/authentication/login']), 3000);
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
