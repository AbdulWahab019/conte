import { sequelize } from '../../config/db';
import { CreateQuestionnaire, Questionnaire, QuestionnaireModel } from '../models/Questionnaire';
import { APIError } from '../utils/apiError';
import { INTERNAL_SERVER_ERROR } from '../utils/constants';

export async function createQuestionnaire(data: CreateQuestionnaire[]) {
  const transaction = await sequelize.transaction();
  try {
    const questionnaire: QuestionnaireModel[] = await Questionnaire.bulkCreate(data, { transaction });
    await transaction.commit();
    return questionnaire;
  } catch (err) {
    await transaction.rollback();
    throw new APIError(500, INTERNAL_SERVER_ERROR, err);
  }
}

export async function getUserQuestionnaireStatus(user_id: number) {
  return !!(await Questionnaire.findOne({ where: { user_id } }));
}
