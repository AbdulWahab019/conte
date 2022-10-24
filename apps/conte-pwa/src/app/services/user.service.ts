import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //TODO add interfaces for request and response

  async acceptTerms(): Promise<any> {
    return await this.http.put<any>(`${USER}/accept-terms-of-use`, null).toPromise();
  }

  async confirmOrientation(): Promise<any> {
    return await this.http.put<any>(`${USER}/watch-orientation-video`, null).toPromise();
  }
}
