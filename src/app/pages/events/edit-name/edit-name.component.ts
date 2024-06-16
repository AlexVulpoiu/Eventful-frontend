import {Component} from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {EventEditService} from "../../../services/event-edit.service";
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-edit-name',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    NgIf
  ],
  templateUrl: './edit-name.component.html',
  styleUrl: './edit-name.component.scss'
})
export class EditNameComponent {
  editNameForm: FormGroup;
  name: string = '';
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditNameComponent>,
    private eventEditService: EventEditService,
    private eventService: EventService
  ) {
    this.eventEditService.getMessage.subscribe(data => {
      this.name = data.name;
      this.id = data.id;
    });
    this.editNameForm = this.fb.group({
      name: [this.name, [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editNameForm.valid) {
      this.eventService.editEventName(this.id, this.editNameForm.get('name')?.value).subscribe(data => console.log(data));
      this.dialogRef.close();
    }
  }
}
