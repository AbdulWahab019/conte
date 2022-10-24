import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QUESTIONNAIRE, USER } from '../utils/constants';
import { SubmitQuestionnaireAPIRequest } from '@conte/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //TODO add interfaces for request and response

  async acceptTerms(): Promise<any> {
    return await this.http.put<any>(`${USER}/accept-terms-of-use`, null).toPromise();
  }

  async confirmOrientation(): Promise<any> {
    return await this.http.put<any>(`${USER}/watch-orientation-video`, null).toPromise();
  }

  async submitQuestionnaire(body: SubmitQuestionnaireAPIRequest): Promise<any> {
    return await this.http.post<any>(`${QUESTIONNAIRE}/`, body).toPromise();
  }
}
