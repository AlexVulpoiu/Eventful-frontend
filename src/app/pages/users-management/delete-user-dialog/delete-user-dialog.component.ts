import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
              private userService: UserService, private notificationService: NotificationService, private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.userService.deleteModerator(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(this.data.id);
        this.notificationService.showInfo('The moderator was deleted!');
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
