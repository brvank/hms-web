import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl
  loginEndPoint = 'api/v1/auth/login'

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string): Observable<any>{

    const url = this.baseUrl + this.loginEndPoint

    const body = {
      user_name: username,
      password: password
    }

    return this.http.post(url, body);
  }
}
