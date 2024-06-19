import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {UserDto} from "../../../dto/users/user-dto";
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
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {ChangeRoleDialogComponent} from "../change-role-dialog/change-role-dialog.component";
import {DeleteUserDialogComponent} from "../delete-user-dialog/delete-user-dialog.component";
import {AddModeratorDialogComponent} from "../add-moderator-dialog/add-moderator-dialog.component";

@Component({
  selector: 'app-view-users',
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
    MatTab,
    MatTabGroup,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss'
})
export class ViewUsersComponent {
  users: UserDto[] = [];
  moderators: UserDto[] = [];
  displayedColumns = ['index', 'name', 'email', 'actions'];
  moderatorText: string = 'By changing this user\'s role to MODERATOR, he will be able to perform moderator specific actions, like organisers or events approval.';
  userText: string = 'By changing this user\'s role to USER, he won\'t be able to perform moderator specific actions, like organisers or events approval anymore.';

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.userService.getUsers('USER').subscribe(data => this.users = data);
    this.userService.getUsers('MODERATOR').subscribe(data => this.moderators = data);
  }

  openChangeRoleDialog(role: string, text: string, id: number) {
    const dialogRef = this.dialog.open(ChangeRoleDialogComponent, {
      width: '400px',
      data: {role, text, id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        window.location.reload();
      }
    });
  }

  openDeleteUserDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '400px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        window.location.reload();
      }
    });
  }

  openAddModeratorDialog(): void {
    const dialogRef = this.dialog.open(AddModeratorDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
