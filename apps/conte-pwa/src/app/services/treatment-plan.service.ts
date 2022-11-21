import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DASHBOARD, TREATMENTPLAN } from '../utils/constants';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CreateFeedbackApiRequest, CreateFeedbackApiResponse } from '@conte/models';

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

  constructor(private http: HttpClient) {}

  //TODO add interfaces for request and response

  setTreatmentPlanDate(date: NgbDate) {
    this.treatmentPlanDate = date;
  }

  getTreatmentPlanDate(): NgbDate {
    return this.treatmentPlanDate;
  }

  getTodaysDate(): NgbDate {
    return this.todaysFormattedDate;
  }

  async getTreatmentPlanDetails(date: string): Promise<any> {
    return await this.http.get<any>(`${DASHBOARD}`, { params: { date } }).toPromise();
  }

  async getDailyTasks(date: string): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/tasks/date/${date}`).toPromise();
  }

  async updateTask(task_id: string, status: boolean, data?: { comment: string }): Promise<any> {
    return await this.http.put<any>(`${TREATMENTPLAN}/task/${task_id}/status/${status}`, data).toPromise();
  }

  async postTaskFeedback(request: CreateFeedbackApiRequest): Promise<any> {
    return await this.http.post<any>(`${TREATMENTPLAN}/task/${request.data[0].task_id}/feedback`, request).toPromise();
  }

  async getTaskFeedback(task_id: string): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/task/${task_id}/feedback`).toPromise();
  }
}
