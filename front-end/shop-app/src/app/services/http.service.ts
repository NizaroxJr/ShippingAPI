import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  getHttpHeader = () => {
    const httpOptions = {
      headers: localStorage.getItem('jwtToken') !== null && typeof localStorage.getItem('jwtToken') !== 'undefined' ? new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken')
      }) : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return httpOptions;
  }
}
