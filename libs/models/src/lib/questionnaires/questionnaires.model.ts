import { UserDemographics } from '../users/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../apps/api/src/app/models/User';

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

export interface CreateQuestionnaireAPIResponse {
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
  user: UserModel[];
  doctor_id: number;
  surgery_id: number;
  user_demographics: UserDemographics;
  user_treatment_plan_name: string;
  surgery_date: string;
}

export interface CreateQuestionnaire {
  user_id: number;
  question_title: string;
  response: string;
  type: string;
}

export interface UserTreatmentPlan {
  id: number;
  name: string;
  user_id: number;
  tp_id: number;
  assigned_at: string;
}
export interface SubmitQuestionnaireApiResponse {
  questionnaireObj: CreateQuestionnaire[];
  user_treatment_plan: UserTreatmentPlan[];
}
