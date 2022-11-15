import { GenericResponse } from '../apiResponse.model';

export interface UploadTreatmentPlanAPIReq {
  file: File;
  doctor_id: number;
  surgery_id?: number;
  name: string;
  read_from_line?: number;
  read_to_line?: number;
}

export interface CreateFeedbackApiRequest {
  task_id: number;
  question: string;
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
