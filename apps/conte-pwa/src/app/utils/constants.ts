import { environment } from '../../environments/environment';

// URLS
export const AUTH = `${environment.API_BASE_URL}/auth`;
export const USER = `${environment.API_BASE_URL}/user`;
export const DOCTOR = `${environment.API_BASE_URL}/doctor`;
export const SURGERY = `${environment.API_BASE_URL}/surgery`;
export const QUESTIONNAIRE = `${environment.API_BASE_URL}/questionnaire`;
export const SUBSCRIPTION = `${environment.API_BASE_URL}/subscription`;
export const TREATMENTPLAN = `${environment.API_BASE_URL}/treatment-plan`;
export const DASHBOARD = `${environment.API_BASE_URL}/dashboard`;
/* Stripe */
export const STRIPE_SUCCESS = `${environment.PWA_BASE_URL}/subscription?state=success`;
export const STRIPE_FAIL = `${environment.PWA_BASE_URL}/subscription?state=fail`;

// Functions
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
