import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {EventEditService} from "../../../services/event-edit.service";
import {EventService} from "../../../services/event.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-description',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    EditorComponent
  ],
  templateUrl: './edit-description.component.html',
  styleUrl: './edit-description.component.scss'
})
export class EditDescriptionComponent {
  editDescriptionForm: FormGroup;
  description: string = '';
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDescriptionComponent>,
    private eventEditService: EventEditService,
    private eventService: EventService, private notificationService: NotificationService, private router: Router
  ) {
    this.eventEditService.getMessage.subscribe(data => {
      this.description = data.description;
      this.id = data.id;
    });
    this.editDescriptionForm = this.fb.group({
      description: [this.description, [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editDescriptionForm.valid) {
      this.eventService.editEventDescription(this.id, this.editDescriptionForm.get('description')?.value).subscribe({
        next: () => {
          this.dialogRef.close(this.editDescriptionForm.value);
          this.notificationService.showSuccess('The event description was updated successfully!');
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
  protected readonly environment = environment;
}
