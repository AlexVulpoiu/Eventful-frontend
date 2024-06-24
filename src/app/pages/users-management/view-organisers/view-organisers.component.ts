import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {OrganiserProfileDto} from "../../../dto/profile/organiser-profile-dto";
import {OrganiserService} from "../../../services/organiser.service";
import {MatDialog} from "@angular/material/dialog";
import {OrganiserDetailsDialogComponent} from "../organiser-details-dialog/organiser-details-dialog.component";
import {TokenStorageService} from "../../../services/token-storage.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-organisers',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatInput,
    MatRow,
    MatRowDef,
    MatTab,
    MatTabGroup,
    MatTable,
    ReactiveFormsModule,
    MatHeaderCellDef
  ],
  templateUrl: './view-organisers.component.html',
  styleUrl: './view-organisers.component.scss'
})
export class ViewOrganisersComponent {

  acceptedOrganisers: OrganiserProfileDto[] = [];
  pendingOrganisers: OrganiserProfileDto[] = [];
  rejectedOrganisers: OrganiserProfileDto[] = [];
  displayedColumns = ['index', 'name', 'email', 'actions'];
  roles: string[] = [];

  constructor(private organiserService: OrganiserService, protected dialog: MatDialog, private router: Router,
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

    this.organiserService.getOrganisers('ACCEPTED').subscribe({
      next: data => {
        this.acceptedOrganisers = data;
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
    });

    this.organiserService.getOrganisers('PENDING').subscribe({
      next: data => {
        this.pendingOrganisers = data;
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
    });

    this.organiserService.getOrganisers('REJECTED').subscribe({
      next: data => {
        this.rejectedOrganisers = data;
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
    });
  }

  openOrganiserDetailsDialog(organiser: OrganiserProfileDto) {
    this.dialog.open(OrganiserDetailsDialogComponent, {
      width: '1200px',
      data: organiser
    });
  }
}
