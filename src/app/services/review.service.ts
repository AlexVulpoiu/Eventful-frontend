import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AddReviewDto} from "../dto/reviews/add-review-dto";

const REVIEW_API = 'http://localhost:8080/api/reviews';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ReviewService {

  constructor(private http: HttpClient) {

  }

  checkAccess(reviewId: string) {
    return this.http.get<void>(REVIEW_API + '/' + reviewId, httpOptions);
  }

  addReview(reviewDto: AddReviewDto) {
    return this.http.post<void>(REVIEW_API, reviewDto, httpOptions);
  }
}
