import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PaymentResponseDto} from "../dto/payment/payment-response-dto";

const PAYMENT_API = 'http://localhost:8080/api/payment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PaymentService {

  constructor(private http: HttpClient) {

  }

  initiatePayment(orderId: number) {
    return this.http.post<PaymentResponseDto>(PAYMENT_API + '/' + orderId, null, httpOptions);
  }
}
