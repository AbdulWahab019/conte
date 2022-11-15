import { genericResponse } from '../apiResponse.model';

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

export interface createFeedbackApiResponse extends genericResponse {
  data: feedbackResponse[];
}

export interface feedbackResponse {
  id: number;
  task_id: number;
  question: string;
  feedback: string;
  type: number;
  createdAt: string;
  updatedAt: string;
}
