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

export interface SubmitQuestionnaireAPIRequest {
  data: SubmitQuestionnaire[];
}
