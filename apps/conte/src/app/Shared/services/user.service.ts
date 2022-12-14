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
    return await this.http.get<any>(`${USER}/web`).toPromise();
  }
  async getTreatmentPlanDetails(user_id: number): Promise<any> {
    return await this.http.get<any>(`${USER}/${user_id}/web`).toPromise();
  }
  async updateTask(user_id: number, task_id: number, data: { data: { title: string } }): Promise<any> {
    return await this.http.put<any>(`${USER}/${user_id}/task/${task_id}/web`, data).toPromise();
  }
}
