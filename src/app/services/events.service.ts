import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {EventPreviewDto} from "../dto/events/event-preview-dto";
import {EventDto} from "../dto/events/event-dto";

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
}
