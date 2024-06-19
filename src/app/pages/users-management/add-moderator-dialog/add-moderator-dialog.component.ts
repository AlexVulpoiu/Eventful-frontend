import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../../services/user.service";
import {AddModeratorDto} from "../../../dto/users/add-moderator-dto";

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
    private userService: UserService
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
      ).subscribe(() =>
        this.dialogRef.close(this.moderatorForm.value));
    }
  }
}
