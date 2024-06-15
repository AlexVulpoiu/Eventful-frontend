export class AddReviewDto {
  public reviewId: string;
  public text: string;


  constructor(reviewId: string, text: string) {
    this.reviewId = reviewId;
    this.text = text;
  }
}
