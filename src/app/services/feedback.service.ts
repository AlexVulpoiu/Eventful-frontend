import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AddFeedbackDto} from "../dto/feedback/add-feedback-dto";
import {FeedbackDto} from "../dto/feedback/feedback-dto";

const FEEDBACK_API = 'http://localhost:8080/api/feedback';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class FeedbackService {

  constructor(private http: HttpClient) {

  }

  addFeedback(feedbackDto: AddFeedbackDto) {
    return this.http.post(FEEDBACK_API, feedbackDto, httpOptions);
  }

  getFeedback() {
    return this.http.get<FeedbackDto[]>(FEEDBACK_API, httpOptions);
  }
}
