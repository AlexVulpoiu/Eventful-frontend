import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-seats-category',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatError,
    NgIf
  ],
  templateUrl: './add-seats-category.component.html',
  styleUrl: './add-seats-category.component.scss'
})
export class AddSeatsCategoryComponent {
  @Input() formGroup!: FormGroup;
}
