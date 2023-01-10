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

export interface GetUserProfileApiResponse extends GenericResponse {
  data: GetUserProfileData;
}

export interface GetUserProfileData extends User {
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
  data: { users: GetUserData[] };
}

export interface GetUserData extends Omit<User, 'password' | 'stripe_customer_id' | 'stripe_subscription_id'> {
  num_skipped_tasks: number;
  num_completed_tasks: number;
}

export interface GetUserTasksCalendarAPIResponse extends GenericResponse {
  data: TaskCalendar[];
}

export interface TaskCalendar {
  tp_day: number;
  total_tasks: number;
  completed_tasks: number;
  skipped_tasks: number;
  date: string;
  selected: boolean;
  day: string;
}

export interface GetDashboardDataAPIResponse extends GenericResponse {
  data: GetDashboardData;
}

export interface GetDashboardData {
  video_url: string;
  are_tasks_completed: boolean;
  tp_start_date: string;
}

export type AcceptTermsOfUseAPIResponse = GenericResponse;

export type WatchOrientationVideoAPIResponse = GenericResponse;

export interface UpdateUserTPTaskAPIRequest {
  task_type?: number;
  title?: string;
  is_completed?: boolean;
  is_skipped?: boolean;
}

export type UpdateUserTPTaskAPIResponse = GenericResponse;

// This api returns CSV File
export type RenderUserTreatmentPlanDetailsAPIResponse = GenericResponse;

export interface CreateUserTreatmentPlanTaskAPIRequest {
  tp_day: number;
  tasks: Pick<Tasks, 'title' | 'is_completed' | 'is_skipped' | 'task_type'>[];
}

export interface CreateUserTreatmentPlanTaskAPIResponse extends GenericResponse {
  data: Tasks[];
}

export interface Tasks {
  id: number;
  user_id: number;
  user_tp_id: number;
  tp_day: number;
  title: string;
  is_completed: boolean;
  is_skipped: boolean;
  task_type: number;
  createdAt: string;
  updatedAt: string;
}
