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

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router,
              private tokenStorageService: TokenStorageService) {
     let user = tokenStorageService.getUser();
     if (user.name != undefined) {
       this.userName = user.name;
     }
  }

  goToProfilePage() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.userName = '';
    this.router.navigate(['/events']);
  }
}
