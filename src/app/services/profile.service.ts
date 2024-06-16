import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ProfileDto} from "../dto/profile/profile-dto";
import {OrganiserProfileDto} from "../dto/profile/organiser-profile-dto";

const PROFILE_API = 'http://localhost:8080/api/profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ProfileService {

  constructor(private http: HttpClient) {

  }

  getProfileDetails() {
    return this.http.get<ProfileDto>(PROFILE_API, httpOptions);
  }

  getOrganiserProfile() {
    return this.http.get<OrganiserProfileDto>(PROFILE_API + '/organiser', httpOptions);
  }

  getAvailablePoints() {
    return this.http.get<number>(PROFILE_API + '/points', httpOptions);
  }
}
