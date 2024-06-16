import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AddCharitableCauseDto} from "../dto/charitable-causes/add-charitable-cause-dto";

const CHARITABLE_CAUSES_API = 'http://localhost:8080/api/charitableCauses';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CharitableCauseService {

  constructor(private http: HttpClient) {

  }

  editCharitableCause(causeId: number, charitableCauseDto: AddCharitableCauseDto) {
    return this.http.put(CHARITABLE_CAUSES_API + '/' + causeId, charitableCauseDto, httpOptions);
  }
}
