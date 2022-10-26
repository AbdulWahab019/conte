import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SUBSCRIPTION } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  //TODO add interfaces for request and response

  async checkSubscription(): Promise<any> {
    return await this.http.get<any>(`${SUBSCRIPTION}/`).toPromise();
  }
}
