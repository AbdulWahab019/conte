import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  async accountLogin(credentials: { email: string; password: string }): Promise<any> {
    return await this.http.post<any>(`${AUTH}/login`, credentials).toPromise();
  }

  async accountRegister(credentials: { email: string; password: string; confirm_password: string }): Promise<any> {
    return await this.http.post<any>(`${AUTH}/register`, credentials).toPromise();
  }
}
