import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewService} from "../../../services/review.service";
import {AddReviewDto} from "../../../dto/reviews/add-review-dto";

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.reviewId = this.route.snapshot.paramMap.get('reviewId');
    this.reviewService.checkAccess(this.reviewId!).subscribe(() => console.log('OK'));
  }

  onSubmit() {
    if (this.reviewForm.valid && this.reviewId) {
      this.reviewService.addReview(new AddReviewDto(this.reviewId, this.reviewForm.value.text))
        .subscribe(() => this.router.navigate(['events']));
    }
  }
}
