import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Credit } from '../model/credit.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlEnum } from '../UrlEnum';
import { User } from '../model/user.model';

export interface AuthResponseData {
  id?: string;
  token?: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  creditCardDetailChanged = new Subject<Credit[]>();

  constructor(private http: HttpClient) {}

  addData(input: Credit) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json')
                                    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Credit>(UrlEnum.API_CREDIT_CARD_ADD, input, {
      headers: headers
    });
  }

  listData() {
    const headers = new HttpHeaders().append('Content-Type', 'application/json')
                                     .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Credit[]>(UrlEnum.API_CREDIT_CARD_LIST, {
      headers: headers
    });
  }

  loginUser(username: string, password: string) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post<AuthResponseData>(UrlEnum.API_CREDIT_CARD_LOGIN, {username, password}, {
      headers: headers
    });
  }

  register(input: User) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post<AuthResponseData>(UrlEnum.API_CREDIT_CARD_REGISTER, input, {
      headers: headers
    });
  }
}
