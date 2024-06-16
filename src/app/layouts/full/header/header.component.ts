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

  showFiller = false;
  userName: string = '';
  user: any = {};

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router,
              private tokenStorageService: TokenStorageService) {
     let user = this.tokenStorageService.getUser();
     this.user = user;
     if (user.name != undefined) {
       this.userName = user.name;
     }
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
    this.authService.logout();
    this.userName = '';
    this.router.navigate(['/events']);
  }
}
