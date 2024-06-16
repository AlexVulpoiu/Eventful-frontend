import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {OrganiserStatisticsDto} from "../dto/statistics/organiser-statistics-dto";

const STATISTICS_API = 'http://localhost:8080/api/statistics';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class StatisticsService {

  constructor(private http: HttpClient) {

  }

  getStatistics() {
    return this.http.get<OrganiserStatisticsDto>(STATISTICS_API, httpOptions);
  }
}
