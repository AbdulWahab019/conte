import { QuestionnaireInterface } from './questionnaires.model';

export const questionnaire_surgery: QuestionnaireInterface = {
  1: { title: 'Surgery Date', type: 'surgery' },
  2: { title: 'Primary Type of Surgery', type: 'surgery' },
  3: { title: 'Secondary Type of Surgery', type: 'surgery' },
  4: { title: 'Doctor Who Performed Surgery', type: 'surgery' },
  5: { title: 'Position', type: 'surgery' },
};

export const questionnaire_non_surgery: QuestionnaireInterface = {
  20: { title: 'Injury Date', type: 'non-surgery' },
  21: { title: 'Injury', type: 'non-surgery' },
  22: { title: 'Doctor', type: 'non-surgery' },
  23: { title: 'Doctor Dictate Return to throwing date', type: 'non-surgery' },
  24: { title: 'Position', type: 'non-surgery' },
};

export const questionnaires: QuestionnaireInterface = {
  ...questionnaire_surgery,
  ...questionnaire_non_surgery,
};
