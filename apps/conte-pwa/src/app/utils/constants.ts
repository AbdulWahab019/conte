import { environment } from '../../environments/environment';

// URLS
export const AUTH = environment.BASE_URL + '/auth';
export const USER = environment.BASE_URL + '/user';
export const DOCTOR = environment.BASE_URL + '/doctor';
export const SURGERY = environment.BASE_URL + '/surgery';
export const QUESTIONNAIRE = environment.BASE_URL + '/questionnaire';

// Functions
export const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

