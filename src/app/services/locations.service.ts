import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SeatedLocationDto} from "../dto/locations/seated-location-dto";
import {Injectable} from "@angular/core";
import {StandingLocationDto} from "../dto/locations/standing-location-dto";
import {AddStandingLocationDto} from "../dto/locations/add-standing-location-dto";
import {AddSeatedLocationDto} from "../dto/locations/add-seated-location-dto";
import {LocationDetailsDto} from "../dto/locations/location-details-dto";

const LOCATIONS_API = 'http://localhost:8080/api/locations';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class LocationsService {
  constructor(private http: HttpClient) {
  }

  getSeatedLocations() {
    return this.http.get<SeatedLocationDto[]>(LOCATIONS_API + '/seated', httpOptions);
  }

  getStandingLocations() {
    return this.http.get<StandingLocationDto[]>(LOCATIONS_API + '/standing', httpOptions);
  }

  addStandingLocation(addStandingLocationDto: AddStandingLocationDto) {
    return this.http.post<number>(LOCATIONS_API + "/standing", addStandingLocationDto, httpOptions);
  }

  addSeatedLocation(addSeatedLocationDto: AddSeatedLocationDto) {
    return this.http.post<number>(LOCATIONS_API + "/seated", addSeatedLocationDto, httpOptions);
  }

  getAllLocations(search: string) {
    let params = '';
    if (search != undefined && search != '') {
      params = '?search=' + search;
    }
    return this.http.get<LocationDetailsDto[]>(LOCATIONS_API + params, httpOptions);
  }
}
