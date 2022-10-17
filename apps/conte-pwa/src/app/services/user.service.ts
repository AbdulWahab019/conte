import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QUESTIONNAIRE, USER } from '../utils/constants';
import { SubmitQuestionnaireAPIRequest } from '@conte/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async acceptTerms(token: string): Promise<any> {
    return await this.http
      .put<any>(`${USER}/accept-terms-of-use`, null, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .toPromise();
  }

  async confirmOrientation(token: string): Promise<any> {
    return await this.http
      .put<any>(`${USER}/watch-orientation-video`, null, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .toPromise();
  }

  async submitQuestionnaire(token: string, body: SubmitQuestionnaireAPIRequest): Promise<any> {
    return await this.http
      .post<any>(`${QUESTIONNAIRE}/`, body, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .toPromise();
  }
}