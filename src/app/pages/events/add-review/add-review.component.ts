import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewService} from "../../../services/review.service";
import {AddReviewDto} from "../../../dto/reviews/add-review-dto";
import {NotificationService} from "../../../services/notification.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-add-review',
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
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss'
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup;
  reviewId: string | null = null;
  roles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private notificationService: NotificationService,
    private tokenStorageService: TokenStorageService
  ) {
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.roles = user.roles;
    }

    if (!this.roles.includes('USER')) {
      if (this.roles.length === 0) {
        this.router.navigate(['/events']);
      } else {
        this.router.navigate(['/events/all']);
      }
    }

    this.reviewForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.reviewId = this.route.snapshot.paramMap.get('reviewId');
    this.reviewService.checkAccess(this.reviewId!).subscribe({
      next: () => {
      },
      error: err => {
        let message = typeof err.error === "string" ? err.error : 'Internal server error';
        let status = typeof err.status === "number" ? err.status : 500;

        if (status === 401 || status === 403) {
          if (this.roles.length === 0 || this.roles.includes('USER')) {
            this.router.navigate(['/events']);
          } else {
            this.router.navigate(['/events/all']);
          }
        } else if (400 <= status && status < 500) {
          this.notificationService.showWarning(message);
          setTimeout(() => {
            if (this.roles.length === 0 || this.roles.includes('USER')) {
              this.router.navigate(['/events']);
            } else {
              this.router.navigate(['/events/all']);
            }
          }, 1000);
        } else {
          this.notificationService.showError(message);
          setTimeout(() => {
            if (this.roles.length === 0 || this.roles.includes('USER')) {
              this.router.navigate(['/events']);
            } else {
              this.router.navigate(['/events/all']);
            }
          }, 1000);
        }
      }
    });
  }

  onSubmit() {
    if (this.reviewForm.valid && this.reviewId) {
      this.reviewService.addReview(new AddReviewDto(this.reviewId, this.reviewForm.value.text))
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('Review added successfully!');
            setTimeout(() => {
              this.router.navigate(['/events']);
            }, 1000);
          },
          error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            let status = typeof err.status === "number" ? err.status : 500;

            if (status === 401 || status === 403) {
              if (this.roles.length === 0 || this.roles.includes('USER')) {
                this.router.navigate(['/events']);
              } else {
                this.router.navigate(['/events/all']);
              }
            } else if (400 <= status && status < 500) {
              this.notificationService.showWarning(message);
              setTimeout(() => {
                if (this.roles.length === 0 || this.roles.includes('USER')) {
                  this.router.navigate(['/events']);
                } else {
                  this.router.navigate(['/events/all']);
                }
              }, 1000);
            } else {
              this.notificationService.showError(message);
              setTimeout(() => {
                if (this.roles.length === 0 || this.roles.includes('USER')) {
                  this.router.navigate(['/events']);
                } else {
                  this.router.navigate(['/events/all']);
                }
              }, 1000);
            }
          }
        });
    }
  }
}
