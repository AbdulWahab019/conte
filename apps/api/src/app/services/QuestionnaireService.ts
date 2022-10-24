import { Transaction } from 'sequelize';

import { CreateQuestionnaire, Questionnaire, QuestionnaireModel } from '../models/Questionnaire';

export async function addQuestionnaire(
  data: CreateQuestionnaire[],
  { transaction }: { transaction?: Transaction }
): Promise<QuestionnaireModel[]> {
  return await Questionnaire.bulkCreate(data, { transaction });
}

export async function isUserQuestionnaireSubmitted(user_id: number) {
  return (await Questionnaire.count({ where: { user_id } })) > 0;
}
