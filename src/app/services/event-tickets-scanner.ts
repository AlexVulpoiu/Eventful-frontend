import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EventTicketsScannerService {
  private message = new BehaviorSubject<any>(null);
  getMessage = this.message.asObservable();

  constructor() {
  }

  setMessage(data: any) {
    this.message.next(data);
  }
}
