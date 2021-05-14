import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data): Observable<object> {
    const url = AppConstants.AUTH_REGESTER;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(url, data, { headers: headers })
      .map((response) => response)
      .catch((error) => throwError(error));
  }
  VerifyOTP(data): Observable<object> {
    const url = AppConstants.VERIFY_OTP;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(url, data, { headers: headers })
      .map((response) => response)
      .catch((error) => throwError(error));
  }
}
