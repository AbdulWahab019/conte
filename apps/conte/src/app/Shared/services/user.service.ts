import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //TODO add interfaces for request and response

  async getAllUsers(): Promise<any> {
    console.log('in');
    return await this.http.get<any>(`${USER}/web`).toPromise();
  }

}
