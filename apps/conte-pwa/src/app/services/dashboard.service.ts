import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DASHBOARD } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  async getTreatmentPlanDetails(date: string): Promise<any> {
    return await this.http.get<any>(`${DASHBOARD}`, { params: { date } }).toPromise();
  }

  async getCalendarDetails(date: string): Promise<any> {
    return await this.http.get<any>(`${DASHBOARD}/calendar/date/${date}`).toPromise();
  }
}
