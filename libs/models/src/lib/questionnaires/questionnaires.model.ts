import { GenericResponse } from '../api/api.model';
import { User, UserDemographics } from '../users/user.model';

export interface QuestionnaireInterface {
  [key: number]: {
    title: string;
    type: string;
  };
}

export interface SubmitQuestionnaire {
  id: number;
  response: string;
}

export interface CreateQuestionnaireAPIRequest {
  data: SubmitQuestionnaire[];
}

export interface CreateQuestionnaireAPIResponse extends GenericResponse {
  data: CreateQuestionnaireAPI;
}

export interface CreateQuestionnaireAPI {
  id: number;
  user_id: number;
  question_title: string;
  response: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitQuestionnaireAPIRequest {
  data: SubmitQuestionnaire[];
  doctor_id: number;
  surgery_id?: number;
  user_treatment_plan_name?: string;
  user_demographics: UserDemographics;
}

export interface SubmitQuestionnaireData {
  questionnaireObj: CreateQuestionnaire[];
  user: User[];
  doctor_id: number;
  surgery_id: number;
  user_demographics: UserDemographics;
  user_treatment_plan_name: string;
  surgery_date: string;
}

export interface CreateQuestionnaire {
  id: 455;
  user_id: number;
  question_title: string;
  response: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserTreatmentPlan {
  id: number;
  name: string;
  user_id: number;
  tp_id: number;
  assigned_at: string;
  updatedAt: string;
  createdAt: string;
}
export interface SubmitQuestionnaireApiResponse extends GenericResponse {
  data: SubmitQuestionnaireAPI;
}

export interface SubmitQuestionnaireAPI {
  questionnaire: CreateQuestionnaire[];
  userTreatmentPlan: UserTreatmentPlan;
}
