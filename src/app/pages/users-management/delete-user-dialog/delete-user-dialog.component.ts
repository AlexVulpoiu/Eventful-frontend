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
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.userService.deleteModerator(this.data.id).subscribe(() => this.dialogRef.close(this.data.id));
  }
}
