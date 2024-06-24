import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RoleService} from "../../services/role.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

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
    private roleService: RoleService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSave() {
    if (this.form.valid) {
      this.roleService.addRole(this.form.value.name).subscribe({
        next: () => {
          this.dialogRef.close(this.form.value);
          this.notificationService.showInfo('The role was added successfully!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.dialogRef.close();
            this.router.navigate(['/events/all']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
