import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH, USER } from '../utils/constants';
import { RegisterCreds , LoginCreds } from '../models/AuthCreds';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  async userRegister(credentials: RegisterCreds): Promise<any> {
    return await this.http.post<any>(`${AUTH}/register/web`, credentials).toPromise();
  }

  async userLogin(credentials: LoginCreds): Promise<any> {
    return await this.http.post<any>(`${AUTH}/login/web`, credentials).toPromise();
  }
  
}
