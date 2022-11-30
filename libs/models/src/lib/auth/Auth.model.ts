export interface CreateAccountAPIReq {
  email: string;
  password: string;
}

export interface AccountLoginAPIReq {
  email: string;
  password: string;
}

export interface CreateAccountAPIRes {
  user_id: number;
  email: string;
  token: string;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  is_questionnaire_submitted: boolean;
}

export interface AccountLoginAPIRes {
  user_id: number;
  email: string;
  token: string;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  is_questionnaire_submitted: boolean;
}
export interface RegisterWebUserReq {
  email: string;
  password: string;
}

export interface RegisterWebUserRes {
  user_id: string;
  email: string;
  is_verified: boolean;
  token: string;
}

export interface LoginWebUserReq {
  email: string;
  password: string;
}

export interface LoginWebUserRes {
  user_id: string;
  email: string;
  token: string;
}
