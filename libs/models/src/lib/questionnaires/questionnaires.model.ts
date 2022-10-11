import { QuestionnaireModel } from './questionnaire.interface';

export const questionnare_surgery: QuestionnaireModel = {
  0: { title: 'Surgery Date', type: 'surgery' },
  1: { title: 'Primary Type of Surgery', type: 'surgery' },
  2: { title: 'Secondary Type of Surgery', type: 'surgery' },
  3: { title: 'Doctor Who Performed Surgery', type: 'surgery' },
  4: { title: 'Position', type: 'surgery' },
  5: { title: 'Estimated Max Velocity (MPH)', type: 'surgery' },
  6: { title: 'Demographic/Contact Information', type: 'surgery' },
};

export const questionnare_non_surgery: QuestionnaireModel = {
  20: { title: 'Injury Date', type: 'non-surgery' },
  21: { title: 'Injury', type: 'non-surgery' },
  22: { title: 'Doctor', type: 'non-surgery' },
  23: { title: 'Doctor Dictate Return to throwing date', type: 'non-surgery' },
  24: { title: 'Position', type: 'non-surgery' },
  25: { title: 'Estimated Max Velocity (MPH)', type: 'non-surgery' },
  26: { title: 'Demographic/Contact Information', type: 'non-surgery' },
};

export const questionnares: QuestionnaireModel = {
  ...questionnare_surgery,
  ...questionnare_non_surgery,
};
