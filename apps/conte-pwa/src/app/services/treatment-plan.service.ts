import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TREATMENTPLAN } from '../utils/constants';
import { PostTaskFeedbackApiRequest } from '@conte/models';
import { therapyTask } from '../models/treatmentplan';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TreatmentPlanService {
  private treatmentPlanDate = moment().format('YYYY-MM-DD');

  private dailyTasks: therapyTask[] = [] as therapyTask[];
  private feedbackStatus = '';
  private pendingTasks: any;

  constructor(private http: HttpClient) {}

  //TODO add interfaces for request and response

  clearAllData() {
    this.treatmentPlanDate = moment().format('YYYY-MM-DD');
    this.dailyTasks = [];
    this.pendingTasks = [];
  }

  setTreatmentPlanDate(date: string) {
    this.treatmentPlanDate = date;
  }

  getTreatmentPlanDate(): string {
    return this.treatmentPlanDate;
  }

  skipFeedback() {
    this.feedbackStatus = 'skipped';
  }

  getFeedbackStatus(): string {
    return this.feedbackStatus;
  }

  setTherapyTasks(tasks: therapyTask[]) {
    this.dailyTasks = tasks;
  }

  getTherapyTasks(): therapyTask[] {
    return this.dailyTasks;
  }

  setPendingTasks(pendingTasks: any) {
    this.pendingTasks = pendingTasks;
  }

  getPendingTasks(): any {
    return this.pendingTasks;
  }

  async getDailyTasks(date: string): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/tasks/date/${date}`).toPromise();
  }

  async updateTask(task_id: number, status: boolean, data?: { comment: string }): Promise<any> {
    return await this.http.put<any>(`${TREATMENTPLAN}/task/${task_id}/status/${status}`, data).toPromise();
  }

  async skipTask(date: string): Promise<any> {
    return await this.http.put<any>(`${TREATMENTPLAN}/tasks/date/${date}/skip`, null).toPromise();
  }

  async postTaskFeedback(request: PostTaskFeedbackApiRequest): Promise<any> {
    this.feedbackStatus = 'submitted';
    return await this.http.post<any>(`${TREATMENTPLAN}/task/${request.data[0].task_id}/feedback`, request).toPromise();
  }

  async getTaskFeedback(task_id: string): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/task/${task_id}/feedback`).toPromise();
  }
}
