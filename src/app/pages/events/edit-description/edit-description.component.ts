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
    private eventService: EventService
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
      this.eventService.editEventDescription(this.id, this.editDescriptionForm.get('description')?.value).subscribe(data => console.log(data));
      this.dialogRef.close();
    }
  }
  protected readonly environment = environment;
}
