import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginRequest} from "../dto/auth/login-request";
import {UserSignupRequest} from "../dto/auth/user-signup-request";
import {LoginResponse} from "../dto/auth/login-response";
import {PersonSignupRequest} from "../dto/auth/person-signup-request";
import {LegalPersonSignupRequest} from "../dto/auth/legal-person-signup-request";
import {TokenStorageService} from "./token-storage.service";
import {Router} from "@angular/router";

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private router: Router) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(AUTH_API + 'login', loginRequest, httpOptions);
  }

  registerUser(userSignupRequest: UserSignupRequest): Observable<any> {
    return this.http.post(AUTH_API + 'users/signup', userSignupRequest, httpOptions);
  }

  registerPerson(personSignupRequest: PersonSignupRequest): Observable<any> {
    return this.http.post(AUTH_API + "organisers/signup", personSignupRequest, httpOptions);
  }

  registerLegalPerson(legalPersonSignupRequest: LegalPersonSignupRequest): Observable<any> {
    return this.http.post(AUTH_API + "organisers/legal/signup", legalPersonSignupRequest, httpOptions);
  }

  logout(): void {
    this.tokenStorageService.logout();
    this.router.navigate(['/events']);
  }
}
