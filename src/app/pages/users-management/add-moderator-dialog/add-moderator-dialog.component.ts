import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../../services/user.service";
import {AddModeratorDto} from "../../../dto/users/add-moderator-dto";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-moderator-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatError,
    MatLabel,
    NgIf,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './add-moderator-dialog.component.html',
  styleUrl: './add-moderator-dialog.component.scss'
})
export class AddModeratorDialogComponent {
  moderatorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddModeratorDialogComponent>,
    private userService: UserService, private notificationService: NotificationService, private router: Router
  ) {
    this.moderatorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.moderatorForm.valid) {
      this.userService.addModerator(
        new AddModeratorDto(this.moderatorForm.value.firstName, this.moderatorForm.value.lastName, this.moderatorForm.value.email)
      ).subscribe({
        next: () => {
          this.dialogRef.close(this.moderatorForm.value);
          this.notificationService.showInfo('The moderator was added successfully!');
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
}
