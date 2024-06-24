import {Component} from '@angular/core';
import {RoleService} from "../../services/role.service";
import {RoleDto} from "../../dto/roles/role-dto";
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
import {MatDialog} from "@angular/material/dialog";
import {AddRoleComponent} from "../add-role/add-role.component";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  roles: RoleDto[] = [];
  displayedColumns = ['index', 'name'];
  userRoles: string[] = [];

  constructor(private roleService: RoleService, private dialog: MatDialog,
              private notificationService: NotificationService, private tokenStorageService: TokenStorageService, private router: Router) {
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.userRoles = user.roles;
    }

    if (!this.userRoles.includes('ADMIN')) {
      if (this.userRoles.length === 0 || this.userRoles.includes('USER')) {
        this.router.navigate(['/events']);
      } else {
        this.router.navigate(['/events/all']);
      }
    }

    this.roleService.getRoles().subscribe({
      next: data => {
        this.roles = data;
      },
      error: err => {
        let message = typeof err.error === "string" ? err.error : 'Internal server error';
        let status = typeof err.status === "number" ? err.status : 500;

        if (status === 401 || status === 403) {
          if (this.userRoles.length === 0 || this.userRoles.includes('USER')) {
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

  openAddRoleDialog() {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   window.location.reload();
      // }
    });
  }
}
