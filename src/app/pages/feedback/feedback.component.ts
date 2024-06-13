import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {FeedbackService} from "../../services/feedback.service";
import {AddFeedbackDto} from "../../dto/feedback/add-feedback-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatLabel,
    NgIf,
    MatButton
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService, private router: Router) {
    this.feedbackForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.feedbackService.addFeedback(new AddFeedbackDto(this.feedbackForm.value.text))
        .subscribe(() => this.router.navigate(['events']));
    }
  }
}
