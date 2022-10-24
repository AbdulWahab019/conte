import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCTOR, SURGERY } from '../utils/constants';

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
}
