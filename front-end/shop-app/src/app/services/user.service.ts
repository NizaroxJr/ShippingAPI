import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverAPI_URL = `http://localhost:8085`;

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  getAllUsers = (): Observable<User[]> => {
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.get<User[]>(`${this.serverAPI_URL}/users/all`, httpOptions);
  }

  logIn = (email: string, password: string): Observable<any> => {
    const url = `${this.serverAPI_URL}/login`;
    const body = {
      email: email,
      password: password
    };
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.post<any>(url, body, httpOptions);
  }

  register = (payload): Observable<any> => {
    const url = `${this.serverAPI_URL}/register`;
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.post<any>(url, payload, httpOptions);
  }

  getCurrentUser = (email): Observable<User> => {
    const url = `${this.serverAPI_URL}/users/get`;
    const payload = {
      email: email
    }
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.post<User>(url, payload, httpOptions);
  }

  editUser = (payload): Observable<any> => {
    const url = `${this.serverAPI_URL}/users/update`;
    const body = {
      oldEmail: payload.email,
      updatedUser: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email
      }
    }
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.put<any>(url, body, httpOptions);
  }

  deleteUser = (payload): Observable<any> => {
    const url = `${this.serverAPI_URL}/users/delete`;
    const body = {
      "email": payload
    }
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.post<any>(url, body, httpOptions);
  }

  getHello = (): Observable<any> => {
    const url = `${this.serverAPI_URL}/hello`;
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.get<String>(url, httpOptions);
  }
}
