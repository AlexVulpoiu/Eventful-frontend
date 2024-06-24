import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {EventEditService} from "../../../services/event-edit.service";
import {MatButton} from "@angular/material/button";
import {CharitableCauseService} from "../../../services/charitable-cause.service";
import {AddCharitableCauseDto} from "../../../dto/charitable-causes/add-charitable-cause-dto";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-edit-charitable-cause',
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
    MatButton,
    MatDialogActions
  ],
  templateUrl: './edit-charitable-cause.component.html',
  styleUrl: './edit-charitable-cause.component.scss'
})
export class EditCharitableCauseComponent {
  form: FormGroup;
  id: number = 0;
  name: string = '';
  description: string = '';
  neededAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCharitableCauseComponent>,
    private eventEditService: EventEditService,
    private charitableCauseService: CharitableCauseService, private notificationService: NotificationService
  ) {
    this.eventEditService.getMessage.subscribe(
      data => {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.neededAmount = data.neededAmount;
      }
    );

    console.log(this.id);

    this.form = this.fb.group({
      name: [this.name, Validators.required],
      description: [this.description, Validators.required],
      neededAmount: [this.neededAmount, [Validators.required, Validators.min(1)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.charitableCauseService.editCharitableCause(this.id,
        new AddCharitableCauseDto(this.form.get('name')?.value, this.form.get('description')?.value, this.form.get('neededAmount')?.value))
        .subscribe({
          next: () => {
            this.dialogRef.close();
            this.notificationService.showSuccess('Charitable cause edited successfully!');
          },

          error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            if (typeof err.status === "number" && 400 <= err.status && err.status < 500) {
              this.notificationService.showWarning(message);
            } else {
              this.notificationService.showError(message);
            }
          }
        });
    }
  }
}
