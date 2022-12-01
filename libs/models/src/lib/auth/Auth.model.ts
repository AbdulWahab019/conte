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
  data: AuthPWAResponse;
}

export interface AccountLoginAPIResponse extends GenericResponse {
  data: AuthPWAResponse;
}

export interface AuthPWAResponse {
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
  data: AuthWebResponse;
}

export interface LoginWebUserRequest {
  email: string;
  password: string;
}

export interface LoginWebUserResponse extends GenericResponse {
  data: Omit<AuthWebResponse, 'is_verified'>;
}

export interface AuthWebResponse {
  user_id: string;
  email: string;
  token: string;
  is_verified: boolean;
}
