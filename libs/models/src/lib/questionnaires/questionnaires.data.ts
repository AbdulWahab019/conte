import { QuestionnaireInterface } from './questionnaire.model';

export const questionnaire_surgery: QuestionnaireInterface = {
  1: { title: 'Surgery Date', type: 'surgery' },
  2: { title: 'Primary Type of Surgery', type: 'surgery' },
  3: { title: 'Secondary Type of Surgery', type: 'surgery' },
  4: { title: 'Doctor Who Performed Surgery', type: 'surgery' },
  5: { title: 'Position', type: 'surgery' },
  6: { title: 'Estimated Max Velocity (MPH)', type: 'surgery' },
  7: { title: 'First Name', type: 'surgery' },
  8: { title: 'Last Name', type: 'surgery' },
  9: { title: 'Cell Phone', type: 'surgery' },
  10: { title: 'Birth Date', type: 'surgery' },
  11: { title: 'Address', type: 'surgery' },
  12: { title: 'City', type: 'surgery' },
  13: { title: 'State', type: 'surgery' },
  14: { title: 'ZIP Code', type: 'surgery' },
};

export const questionnaire_non_surgery: QuestionnaireInterface = {
  20: { title: 'Injury Date', type: 'non-surgery' },
  21: { title: 'Injury', type: 'non-surgery' },
  22: { title: 'Doctor', type: 'non-surgery' },
  23: { title: 'Doctor Dictate Return to throwing date', type: 'non-surgery' },
  24: { title: 'Position', type: 'non-surgery' },
  25: { title: 'Estimated Max Velocity (MPH)', type: 'non-surgery' },
  26: { title: 'First Name', type: 'non-surgery' },
  27: { title: 'Last Name', type: 'non-surgery' },
  28: { title: 'Cell Phone', type: 'non-surgery' },
  29: { title: 'Birth Date', type: 'non-surgery' },
  30: { title: 'Address', type: 'non-surgery' },
  31: { title: 'City', type: 'non-surgery' },
  32: { title: 'State', type: 'non-surgery' },
  33: { title: 'ZIP Code', type: 'non-surgery' },
};

export const questionnaires: QuestionnaireInterface = {
  ...questionnaire_surgery,
  ...questionnaire_non_surgery,
};
