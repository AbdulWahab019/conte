import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCTOR, QUESTIONNAIRE, SURGERY } from '../utils/constants';
import { SubmitQuestionnaireAPIRequest } from '@conte/models';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient) {}

  async getAllDoctors(): Promise<any> {
    return await this.http.get<any>(`${DOCTOR}/`).toPromise();
  }

  async getSurgeriesForDoctor(doctor_id: string): Promise<any> {
    return await this.http.get<any>(`${SURGERY}/doctor/${doctor_id}`).toPromise();
  }

  async submitQuestionnaire(body: SubmitQuestionnaireAPIRequest): Promise<any> {
    return await this.http.post<any>(`${QUESTIONNAIRE}/submit`, body).toPromise();
  }
}
