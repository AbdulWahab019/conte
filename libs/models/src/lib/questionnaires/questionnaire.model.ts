import { UserDemographics } from '../users/user.model';

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

export interface SubmitQuestionnaireAPIRequest {
  data: SubmitQuestionnaire[];
  doctor_id: number;
  surgery_id?: number;
  user_treatment_plan_name?: string;
  user_demographics: UserDemographics;
}
