import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router, private http: HttpClient) {}

  async accountLogin(credentials: { email: string; password: string }): Promise<any> {
    return await this.http.post<any>(`${environment.ACCOUNT}/login`, credentials).toPromise();
  }

  async accountRegister(credentials: { email: string; password: string; confirm_password: string }): Promise<any> {
    return await this.http.post<any>(`${environment.ACCOUNT}/register`, credentials).toPromise();
  }
}
