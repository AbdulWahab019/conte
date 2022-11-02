import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TREATMENTPLAN } from '../utils/constants';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class TreatmentPlanService {
  private todaysDate = new Date();
  private treatmentPlanDate = new NgbDate(
    this.todaysDate.getFullYear(),
    this.todaysDate.getMonth() + 1,
    this.todaysDate.getDate()
  );

  constructor(private http: HttpClient) {}

  //TODO add interfaces for request and response

  setTreatmentPlanDate(date: NgbDate) {
    this.treatmentPlanDate = date;
  }

  getTreatmentPlanDate(): NgbDate {
    return this.treatmentPlanDate;
  }

  async getDailyTasks(date: string): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/tasks/date/${date}`).toPromise();
  }

  async updateTask(task_id: string, status: boolean): Promise<any> {
    return await this.http.put<any>(`${TREATMENTPLAN}/task/${task_id}/status/${status}`, null).toPromise();
  }
}
