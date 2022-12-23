import { GenericResponse } from '../api/api.model';
export interface TreatmentPlanDetails {
  tp_weekday?: string;
  week_from_sx?: number;
  month_from_sx?: number;
  week_of_throwing?: number;
  month_of_throwing?: number;
  plyo_throw?: number;
  max_distance?: number;
  max_velocity_percent?: number;
  max_velocity_absolute?: number;
  num_throws_at_max_distance?: number;
  post_max_distance_flat_ground?: number;
  post_max_distance_flat_ground_velocity_percent?: number;
  post_max_distance_flat_ground_velocity_absolute?: number;
  post_max_flat_ground_pitches?: number;
  bullpen?: number;
  bullpen_max_velocity_percent?: number;
  bullpen_max_velocity_absolute?: number;
  bullpen_pitches?: number;
  live_simulated_game?: number;
  innings?: number;
  video_url?: string;
}

export interface Task {
  id: number;
  user_id: number;
  user_tp_id: number;
  tp_day: number;
  task_type: number;
  title: string;
  is_completed: boolean;
  is_skipped: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UploadTreatmentPlanAPIRequest {
  file: File;
  doctor_id: number;
  surgery_id?: number;
  name: string;
  read_from_line?: number;
  read_to_line?: number;
}

export interface UploadTreatmentPlanAPIResponse extends GenericResponse {
  data: UploadTreatmentPlan;
}

export interface UploadTreatmentPlan {
  id: number;
  name: string;
  doctor_id: number;
  surgery_id?: number;
  createdAt: string;
  updatedAt: string;
  TreatmentPlanDetails: TreatmentPlanDetail[];
}

export interface TreatmentPlanDetail {
  id: number;
  tp_id: number;
  tp_day: number;
  tp_weekday: string;
  week_from_sx: number;
  month_from_sx: number;
  plyo_throw: number;
  max_distance: number;
  max_velocity_percent: number;
  max_velocity_absolute: number;
  num_throws_at_max_distance: number;
  post_max_distance_flat_ground: number;
  post_max_distance_flat_ground_velocity_percent: number;
  post_max_distance_flat_ground_velocity_absolute: number;
  post_max_flat_ground_pitches: string;
  bullpen: number;
  bullpen_max_velocity_percent: number;
  bullpen_max_velocity_absolute: number;
  bullpen_pitches: string;
  live_simulated_game: number;
  innings: number;
  video_url: string;
  created_at: string;
  updated_at: string;
}

export interface PostTaskFeedbackApiRequest {
  data: TaskFeedbackRequest[];
}

export interface TaskFeedbackRequest {
  task_id: number;
  question?: string;
  feedback: string;
  type: number;
}

export interface PostFeedbackApiResponse extends GenericResponse {
  data: TaskFeedbackResponse[];
}

export interface TaskFeedbackResponse {
  id: number;
  task_id: number;
  question: string;
  feedback: string;
  type: number;
  createdAt: string;
  updatedAt: string;
}

export enum TPStatus {
  STARTED = 'Started',
  NOT_STARTED = 'Not started',
}

export interface GetUserTasksByDateAPIResponse extends GenericResponse {
  data: GetUserTasksByDate;
}

export interface GetUserTasksByDate {
  todays_tasks: TaskResponse[];
  pending_tasks_dates: string[];
  status: string;
}

export interface TaskResponse extends Omit<Task, 'createdAt' | 'updatedAt'> {
  feedback: FeedbackData[];
}

export interface FeedbackData {
  id: number;
  task_id: number;
  question: string;
  feedback: string;
  type: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetUserTaskFeedbackAPIResponse extends GenericResponse {
  data: GetUserTaskFeedback[];
}

export interface GetUserTaskFeedback {
  id: number;
  feedback: string;
  type: number;
}

export interface GetAllTreatmentPlansAPIResponse extends GenericResponse {
  data: TreatmentPlan[];
}

export interface GetUserSkippedAndCompletedTasksAPIResponse extends GenericResponse {
  data: GetUserSkippedAndCompletedTasks;
}

export interface GetUserSkippedAndCompletedTasks {
  completed_tasks: Task[];
  skipped_tasks: Task[];
  pending_tasks: Task[];
}

export type SkipUserTasksAPIResponse = GenericResponse;

export interface UpdateTaskAPIRequest {
  comment?: string;
}

export type UpdateTaskAPIResponse = GenericResponse;

export interface UserTreatmentPlan {
  id: number;
  name: string;
  user_id: number;
  tp_id: number;
  assigned_at: string;
  updatedAt: string;
  createdAt: string;
}

export interface GetTreatmentPlanByIdAPIResponse extends GenericResponse {
  data: TreatmentPlan;
}

export interface TreatmentPlan {
  id: number;
  name: string;
  doctor_id: number;
  surgery_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface UploadTreatmentTypeVideoAPIResponse extends GenericResponse {
  data: UploadTreatmentTypeVideo;
}

export interface UploadTreatmentTypeVideo {
  name: string;
  url: string;
}

export interface UpdateTreatmentPlanDetailsAPIRequest {
  data: TreatmentPlanDetails;
}

export interface UpdateTreatmentPlanDetailsAPIResponse {
  data: TreatmentPlanDetails;
}
