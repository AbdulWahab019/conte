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
  async createTask(data: { tp_day: number; tasks: [] }, user_Id: number, tp_Id: number): Promise<any> {
    return await this.http.post<any>(`${USER}/${tp_Id}/user-treatment-plan/${user_Id}`, data).toPromise();
  }
  async transferTask(data: { tp_day: number; task_ids: [] }, tp_Id: number): Promise<any> {
    return await this.http.post<any>(`${USER}/user-treatment-plan/${tp_Id}/reassign-tasks`, data).toPromise();
  }
  async postponeTask(data: { tp_day: number; num_gap_days: number }, user_tp_id: number): Promise<any> {
    return await this.http.put<any>(`${USER}/user-treatment-plan/${user_tp_id}/postpone-tp-days`, data).toPromise();
  }
}
