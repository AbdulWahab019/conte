import { GenericResponse } from '../api/api.model';

export interface UploadTreatmentPlanAPIReq {
  file: File;
  doctor_id: number;
  surgery_id?: number;
  name: string;
  read_from_line?: number;
  read_to_line?: number;
}

export interface createTreatmentPlanAPIRes {
  name: string;
  doctor_id: number;
  surgery_id: number;
  TreatmentPlanDetails: [];
}

export interface CreateFeedbackApiRequest {
  data: FeedbackRequest[];
}

export interface FeedbackRequest {
  task_id: number;
  question?: string;
  feedback: string;
  type: number;
}

export interface CreateFeedbackApiResponse extends GenericResponse {
  data: FeedbackResponse[];
}

export interface FeedbackResponse {
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

export interface getUserTasksByDateRes {
  // TODO - Update this interface
  user_id: number;
  user_tp_id: number;
  tp_day: number;
  task_type: number;
  title: string;
  is_completed: boolean;
  is_skipped: boolean;
  UserTreatmentPlanTaskFeedback: [];
}

export interface GetUserTaskFeedback {
  id: number;
  feedback: string;
  type: number;
}
