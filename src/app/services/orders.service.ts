import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {NewOrderDto} from "../dto/orders/new-order-dto";
import {OrderDto} from "../dto/orders/order-dto";

const ORDERS_API = 'http://localhost:8080/api/orders';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class OrdersService {

  constructor(private http: HttpClient) {

  }

  placeOrder(newOrderDto: NewOrderDto) {
    return this.http.post<OrderDto>(ORDERS_API, newOrderDto, httpOptions);
  }
}
