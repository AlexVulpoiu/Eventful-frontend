import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RoleService} from "../../services/role.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    NgIf,
    MatDialogActions,
    MatButton
  ],
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRoleComponent>,
    private roleService: RoleService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSave() {
    if (this.form.valid) {
      this.roleService.addRole(this.form.value.name).subscribe(() => {});
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
