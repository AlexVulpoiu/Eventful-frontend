import { Component } from '@angular/core';
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

  constructor(private roleService: RoleService, private dialog: MatDialog) {
    this.roleService.getRoles().subscribe(data => this.roles = data);
  }

  openAddRoleDialog() {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
