import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-standing-category',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatError,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-standing-category.component.html',
  styleUrl: './add-standing-category.component.scss'
})
export class AddStandingCategoryComponent {
  @Input() formGroup!: FormGroup;
}
