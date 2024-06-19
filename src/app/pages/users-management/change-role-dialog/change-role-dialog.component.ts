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
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { role: string; text: string; id: number }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.userService.changeRoleForUser(this.data.id, this.data.role)
      .subscribe(() => this.dialogRef.close(this.data.id));
  }
}
