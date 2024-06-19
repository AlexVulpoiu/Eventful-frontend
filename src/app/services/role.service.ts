import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {RoleDto} from "../dto/roles/role-dto";

const ROLES_API = 'http://localhost:8080/api/roles';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class RoleService {
  constructor(private http: HttpClient) {
  }

  getRoles() {
    return this.http.get<RoleDto[]>(ROLES_API, httpOptions);
  }

  addRole(roleName: string) {
    return this.http.post(ROLES_API, roleName, httpOptions);
  }
}
