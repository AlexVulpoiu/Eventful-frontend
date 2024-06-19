import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserDto} from "../dto/users/user-dto";
import {AddModeratorDto} from "../dto/users/add-moderator-dto";

const USERS_API = 'http://localhost:8080/api/users';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUsers(role: string) {
    return this.http.get<UserDto[]>(USERS_API + '?role=' + role, httpOptions);
  }

  addModerator(addModerator: AddModeratorDto) {
    return this.http.post(USERS_API + '/moderator', addModerator, httpOptions);
  }

  changeRoleForUser(userId: number, role: string) {
    return this.http.put(USERS_API + '/role/' + userId, role, httpOptions);
  }

  deleteModerator(userId: number) {
    return this.http.delete(USERS_API + '/' + userId, httpOptions);
  }
}
