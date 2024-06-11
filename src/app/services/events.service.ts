import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {EventPreviewDto} from "../dto/events/event-preview-dto";
import {EventDto} from "../dto/events/event-dto";
import {TicketDto} from "../dto/tickets/ticket-dto";
import {AddEventDto} from "../dto/events/add-event-dto";

const EVENTS_API = 'http://localhost:8080/api/events';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class EventsService {
  constructor(private http: HttpClient) {

  }

  getEventsList(search: string) {
    let queryParams: string = '?';
    if (search !== undefined && search !== null) {
      queryParams += `search=${encodeURIComponent(search)}`;
    }
    return this.http.get<EventPreviewDto[]>(EVENTS_API + queryParams, httpOptions);
  }

  getEvent(id: number) {
    return this.http.get<EventDto>(EVENTS_API + '/' + id, httpOptions);
  }

  addEvent(addEventDto: AddEventDto) {
    return this.http.post<number>(EVENTS_API, addEventDto, httpOptions);
  }

  getTicketInfo(eventId: number, ticketId: string) {
    return this.http.get<TicketDto>(EVENTS_API + '/ticketInfo/' + eventId + '?ticketId=' + ticketId, httpOptions);
  }

  validateTicket(eventId: number, ticketId: string) {
    return this.http.post(EVENTS_API + '/validateTicket/' + eventId + '?ticketId=' + ticketId, httpOptions);
  }

  updateLogo(eventId: number, formData: FormData) {
    return this.http.patch(EVENTS_API + '/' + eventId, formData);
  }
}
