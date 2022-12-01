import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DASHBOARD } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private trialView = false;
  constructor(private http: HttpClient) {}

  setTrialView() {
    this.trialView = true;
  }

  getTrialView(): boolean {
    return this.trialView;
  }

  async getTreatmentPlanDetails(date: string): Promise<any> {
    return await this.http.get<any>(`${DASHBOARD}`, { params: { date } }).toPromise();
  }

  async getCalendarDetails(date: string): Promise<any> {
    return await this.http.get<any>(`${DASHBOARD}/calendar/date/${date}`).toPromise();
  }
}
