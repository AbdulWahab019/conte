import { GenericResponse } from '../api/api.model';

export interface CreateAccountAPIRequest {
  email: string;
  password: string;
}

export interface AccountLoginAPIRequest {
  email: string;
  password: string;
}

export interface CreateAccountAPIResponse extends GenericResponse {
  data: CreateAccountPWA;
}

export interface CreateAccountPWA {
  user_id: number;
  email: string;
  token: string;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  is_questionnaire_submitted: boolean;
}
export interface AccountLoginAPIResponse extends GenericResponse {
  data: AccountLoginPWA;
}

export interface AccountLoginPWA {
  user_id: number;
  email: string;
  token: string;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  is_questionnaire_submitted: boolean;
}
export interface RegisterWebUserRequest {
  email: string;
  password: string;
}

export interface RegisterWebUserResponse extends GenericResponse {
  data: RegisterWebUser;
}

export interface RegisterWebUser {
  user_id: string;
  email: string;
  is_verified: boolean;
  token: string;
}
export interface LoginWebUserRequest {
  email: string;
  password: string;
}

export interface LoginWebUserResponse extends GenericResponse {
  data: LoginWebUser;
}

export interface LoginWebUser {
  user_id: string;
  email: string;
  is_verified: boolean;
  token: string;
}
