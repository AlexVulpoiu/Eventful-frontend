import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {FeedbackService} from "../../services/feedback.service";
import {AddFeedbackDto} from "../../dto/feedback/add-feedback-dto";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";
import {NotificationService} from "../../services/notification.service";

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
  roles: string[] = [];

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService, private router: Router,
              private tokenStorageService: TokenStorageService, private notificationService: NotificationService) {
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.roles = user.roles;
    }

    if (!this.roles.includes('USER') && !this.roles.includes('ORGANISER')) {
      this.router.navigate(['/events/all']);
    }

    this.feedbackForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.feedbackService.addFeedback(new AddFeedbackDto(this.feedbackForm.value.text))
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('Feedback successfully submitted!');
            setTimeout(() => {
              this.router.navigate(['events']);
            }, 1000);
          },
          error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            let status = typeof err.status === "number" ? err.status : 500;

            if (status === 401 || status === 403) {
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
}
