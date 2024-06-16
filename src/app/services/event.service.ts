import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {EventPreviewDto} from "../dto/events/event-preview-dto";
import {EventDto} from "../dto/events/event-dto";
import {TicketDto} from "../dto/tickets/ticket-dto";
import {AddEventDto} from "../dto/events/add-event-dto";
import {AddPromotionDto} from "../dto/events/add-promotion-dto";
import {AddRaffleDto} from "../dto/events/add-raffle-dto";
import {ChangeEventStatusDto} from "../dto/events/change-event-status-dto";
import {ReviewDetailsDto} from "../dto/reviews/review-details-dto";
import {EventOrderDto} from "../dto/orders/event-orders-dto";

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

  getEventsByStatusAndEndDate(status: string, ended: boolean) {
    let queryParams: string = '?status=' + status + '&ended=' + ended;
    return this.http.get<EventPreviewDto[]>(EVENTS_API + '/all' + queryParams, httpOptions);
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

  addRaffle(eventId: number, raffleDto: AddRaffleDto) {
    return this.http.post<AddRaffleDto>(EVENTS_API + '/' + eventId + '/raffle', raffleDto, httpOptions);
  }

  updateEventStatus(eventId: number, changeEventStatus: ChangeEventStatusDto) {
    return this.http.patch<string>(EVENTS_API + '/status/' + eventId, changeEventStatus, httpOptions);
  }

  getReviews(eventId: number) {
    return this.http.get<ReviewDetailsDto[]>(EVENTS_API + '/reviews/' + eventId, httpOptions);
  }

  getOrders(eventId: number) {
    return this.http.get<EventOrderDto>(EVENTS_API + '/orders/' + eventId, httpOptions);
  }

  editEventName(eventId: number, name: string) {
    return this.http.patch(EVENTS_API + '/name/' + eventId, name, httpOptions);
  }

  editEventDescription(eventId: number, description: string) {
    return this.http.patch(EVENTS_API + '/description/' + eventId, description, httpOptions);
  }

  updateSeatedPrices(eventId: number, prices: any) {
    return this.http.put(EVENTS_API + '/seatedPrices/' + eventId, prices, httpOptions);
  }

  updateStandingPrices(eventId: number, prices: any) {
    return this.http.put(EVENTS_API + '/standingPrices/' + eventId, prices, httpOptions);
  }
}
