import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TREATMENTPLAN } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TreatmentPlanService {
  constructor(private http: HttpClient) {}
  async getTreatmentPlans(): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/web`).toPromise();
  }
  async getTasks(user_id: string): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/tasks/${user_id}/web`).toPromise();
  }
}
