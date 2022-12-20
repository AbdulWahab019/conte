import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TREATMENTPLAN } from '../utils/constants';
import { Task, TreatmentPlanDetails } from '../models/TreatmentPlan';

@Injectable({
  providedIn: 'root',
})
export class TreatmentPlanService {

  public userTreatmentPlanData = {completed_tasks : [] as Task[] , pending_tasks : [] as Task[] , skipped_tasks : [] as Task[] , userTreatmentPlan : {} as TreatmentPlanDetails};

  constructor(private http: HttpClient) {}
  async getTreatmentPlans(): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/web`).toPromise();
  }
  async getTasks(user_id: number): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/tasks/${user_id}/web`).toPromise();
  }
}
