import { GenericResponse } from '../api/api.model';

export interface User extends UserDemographics {
  id: number;
  email: string;
  password: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  is_subscribed: boolean;
}
export interface UserDemographics {
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  estimated_max_velocity: number;
}

export interface GetUserProfileApiRes extends GenericResponse {
  data: GetUserProfileData;
}

export interface GetUserProfileData {
  id: number;
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  email: string;
  estimated_max_velocity: number;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  is_subscribed: boolean;
  is_questionnaire_submitted: boolean;
}

export interface UpdateUserResponse extends GenericResponse {
  data: UpdateUser;
}

export interface UpdateUser {
  email: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  estimated_max_velocity: number;
}

export interface GetUserDataApiResponse extends GenericResponse {
  data: GetUserData;
}

export interface GetUserData {
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  email: string;
  estimated_max_velocity: number;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  is_subscribed: boolean;
  num_skipped_tasks: number;
  num_completed_tasks: number;
}
export interface GetUserTasksCalendarAPIResponse extends GenericResponse {
  data: GetUserTasksCalendar;
}

export interface GetUserTasksCalendar {
  tp_day: number;
  total_tasks: number;
  date: string;
  selected: boolean;
  day: string;
}
