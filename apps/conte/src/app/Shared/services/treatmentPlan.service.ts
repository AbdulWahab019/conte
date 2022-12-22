import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TREATMENTPLAN } from '../utils/constants';
import { UserTreatmentPlanData, UserTreatmentPlanDataForTp } from '../models/TreatmentPlan';

@Injectable({
  providedIn: 'root',
})
export class TreatmentPlanService {
  public userTreatmentPlanData = {} as UserTreatmentPlanData;

  public userTreatmentPlanDataForTp = {} as UserTreatmentPlanDataForTp;

  constructor(private http: HttpClient) {}

  clearUserTreatmentPlanData() {
    this.userTreatmentPlanData = {} as UserTreatmentPlanData;
  }

  clearUserTreatmentPlanDataForTp() {
    this.userTreatmentPlanDataForTp = {} as UserTreatmentPlanDataForTp;
  }

  async getTreatmentPlanDetails(user_id: number): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/${user_id}`).toPromise();
  }

  async getTreatmentPlans(): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/web`).toPromise();
  }

  async getTasks(user_id: number): Promise<any> {
    return await this.http.get<any>(`${TREATMENTPLAN}/user/${user_id}/tasks/web`).toPromise();
  }

  async uploadVideo(video: File): Promise<any> {
    const formData = new FormData();
    formData.append('video', video);

    return await this.http.post<any>(`${TREATMENTPLAN}/video/upload`, formData).toPromise();
  }

  async updateTask(data : {video_url : string} ,tp_day : number,tp_Id : number): Promise<any> {
   return await this.http.put<any>(`${TREATMENTPLAN}/tp_day/${tp_day}/tp_id/${tp_Id}`,{data}).toPromise();
  }

}
