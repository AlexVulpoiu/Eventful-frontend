import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {formatDate, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {ProfileService} from "../../services/profile.service";
import {ProfileDto} from "../../dto/profile/profile-dto";
import {OrderProfileDetails} from "../../dto/orders/order-profile-details-dto";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    TitleCasePipe,
    MatHeaderCellDef,
    NgIf,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ['orderId', 'status', 'orderDate', 'eventName', 'total', 'tickets'];
  profileDetails: ProfileDto | undefined;
  orders: OrderProfileDetails[] = [];
  roles: string[] = [];

  constructor(private profileService: ProfileService, private tokenStorageService: TokenStorageService, private router: Router,
              private notificationService: NotificationService, @Inject(LOCALE_ID) public locale: string) {
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.roles = user.roles;
    }

    if (!this.roles.includes('USER')) {
      if (this.roles.length === 0) {
        this.router.navigate(['/events']);
      } else {
        this.router.navigate(['/events/all']);
      }
    }
  }

  ngOnInit() {
    this.profileService.getProfileDetails().subscribe({
      next: data => {
        this.profileDetails = data;
        this.orders = data.orders;
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

  protected readonly formatDate = formatDate;
}
