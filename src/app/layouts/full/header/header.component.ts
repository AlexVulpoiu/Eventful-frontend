import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {NotificationService} from "../../../services/notification.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  roles: string[] = [];
  isGuest: boolean = true;
  isUser: boolean = false;
  isOrganiser: boolean = false;
  isModerator: boolean = false;
  isAdmin: boolean = false;
  userName: string = '';
  user: any = {};

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router,
              private tokenStorageService: TokenStorageService, private notificationService: NotificationService) {
     let user = this.tokenStorageService.getUser();
     this.user = user;
     if (user.name != undefined) {
       this.userName = user.name;
     }
     if (user.roles != undefined) {
       this.roles = user.roles;
     }
     this.isGuest = this.roles.length == 0;
     this.isUser = this.roles.includes('USER');
     this.isOrganiser = this.roles.includes('ORGANISER');
     this.isModerator = this.roles.includes('MODERATOR');
     this.isAdmin = this.roles.includes('ADMIN');
  }

  goToProfilePage() {
    if (this.user.roles.includes('ORGANISER')) {
      this.router.navigate(['/organiser-profile']);
    } else {
      this.router.navigate(['/profile']);
    }
  }

  goToStatisticsPage() {
    this.router.navigate(['/statistics']);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.tokenStorageService.logout();
        this.userName = '';
        localStorage.setItem('login-page-message', "You have been logged out successfully");
        setTimeout(() => this.router.navigate(['/authentication/login']), 1000);
      },
      error: err => {
        let message = typeof err.error === "string" ? err.error : 'Internal server error';
        let status = typeof err.status === "number" ? err.status : 500;

        if (status === 401 || status === 403) {
          if (this.roles.length === 0 || this.roles.includes('USER')) {
            this.router.navigate(['/events']);
          } else {
            this.router.navigate(['/events/all']);
          }
        } else if (400 <= status && status < 500) {
          this.notificationService.showWarning(message);
        } else {
          this.notificationService.showError(message);
        }
      }
    });
  }
}
