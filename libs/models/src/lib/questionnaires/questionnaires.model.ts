import { GenericResponse } from '../api/api.model';
import { UserTreatmentPlan } from '../treatmentPlans/treatmentPlan.model';
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
  data: CreateQuestionnaire[];
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
  user_treatment_plan_name?: string;
  surgery_date: string;
}

export interface CreateQuestionnaire {
  id: number;
  user_id: number;
  question_title: string;
  response: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitQuestionnaireApiResponse extends GenericResponse {
  data: SubmitQuestionnaireAPI;
}

export interface SubmitQuestionnaireAPI {
  questionnaire: CreateQuestionnaire[];
  userTreatmentPlan: UserTreatmentPlan;
}
