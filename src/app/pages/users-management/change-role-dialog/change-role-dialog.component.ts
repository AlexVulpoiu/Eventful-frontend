import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../../services/user.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-role-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './change-role-dialog.component.html',
  styleUrl: './change-role-dialog.component.scss'
})
export class ChangeRoleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangeRoleDialogComponent>,
    private userService: UserService, private notificationService: NotificationService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { role: string; text: string; id: number }
  ) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.userService.changeRoleForUser(this.data.id, this.data.role)
      .subscribe({
        next: () => {
          this.dialogRef.close(this.data.id);
          this.notificationService.showInfo('User role was changed successfully!');
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
