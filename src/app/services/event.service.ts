import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {EventPreviewDto} from "../dto/events/event-preview-dto";
import {EventDto} from "../dto/events/event-dto";
import {TicketDto} from "../dto/tickets/ticket-dto";
import {AddEventDto} from "../dto/events/add-event-dto";
import {AddPromotionDto} from "../dto/events/add-promotion-dto";
import {RaffleDto} from "../dto/events/raffle-dto";
import {ChangeEventStatusDto} from "../dto/events/change-event-status-dto";

const EVENTS_API = 'http://localhost:8080/api/events';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private http: HttpClient) {

  }

  getEventsList(search: string, page: number, size: number) {
    let queryParams: string = '?';
    if (search !== undefined && search !== null) {
      queryParams += `search=${encodeURIComponent(search)}`;
    }
    queryParams += '&pageNumber=' + page + '&size=' + size;
    return this.http.get<{content: EventPreviewDto[], totalElements: number}>(EVENTS_API + queryParams, httpOptions);
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

  addPromotion(eventId: number, promotionDto: AddPromotionDto) {
    return this.http.post<EventDto>(EVENTS_API + '/' + eventId + '/promotion', promotionDto, httpOptions);
  }

  addRaffle(eventId: number, raffleDto: RaffleDto) {
    return this.http.post<RaffleDto>(EVENTS_API + '/' + eventId + '/raffle', raffleDto, httpOptions);
  }

  updateEventStatus(eventId: number, changeEventStatus: ChangeEventStatusDto) {
    return this.http.patch<string>(EVENTS_API + '/status/' + eventId, changeEventStatus, httpOptions);
  }
}
