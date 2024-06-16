import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {EventEditService} from "../../../services/event-edit.service";
import {MatButton} from "@angular/material/button";
import {CharitableCauseService} from "../../../services/charitable-cause.service";
import {AddCharitableCauseDto} from "../../../dto/charitable-causes/add-charitable-cause-dto";

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
    private charitableCauseService: CharitableCauseService
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
      console.log(this.id);
      this.charitableCauseService.editCharitableCause(this.id,
        new AddCharitableCauseDto(this.form.get('name')?.value, this.form.get('description')?.value, this.form.get('neededAmount')?.value))
        .subscribe(data => console.log(data));
      this.dialogRef.close();
    }
  }
}
