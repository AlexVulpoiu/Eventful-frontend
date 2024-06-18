import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {OrganiserProfileDto} from "../dto/profile/organiser-profile-dto";

const ORGANISERS_API = 'http://localhost:8080/api/organisers';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class OrganiserService {
  constructor(private http: HttpClient) {
  }

  getOrganisers(status: string) {
    return this.http.get<OrganiserProfileDto[]>(ORGANISERS_API + '?status=' + status, httpOptions);
  }

  updateOrganiserStatus(organiserId: number, status: string) {
    return this.http.patch(ORGANISERS_API + '/' + organiserId + '?status=' + status, httpOptions);
  }
}
