import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TREATMENTPLAN } from '../utils/constants';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class TreatmentPlanService {
  private todaysDate = new Date();
  private todaysFormattedDate = new NgbDate(
    this.todaysDate.getFullYear(),
    this.todaysDate.getMonth() + 1,
    this.todaysDate.getDate()
  );
  private treatmentPlanDate = new NgbDate(
    this.todaysDate.getFullYear(),
    this.todaysDate.getMonth() + 1,
    this.todaysDate.getDate()
  );
  private pendingTasks: any;

  constructor(private http: HttpClient) {}
  async getTreatmentPlans(): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/web`).toPromise();
  }
  async getTasks(task_id: string): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/tasks/${task_id}/web`).toPromise();
  }
}
