import { sequelize } from '../models';
import {
  CreateQuestionnaire,
  Questionnaire,
  QuestionnaireModel,
  SubmitQuestionnaireData,
} from '../models/Questionnaire';
import { APIError } from '../utils/apiError';
import {
  SEQUELIZE_UNIQUE_CONSTRAINT_ERROR,
  TREATMENT_PLAN_ALREADY_ASSIGNED,
  TREATMENT_PLAN_NOT_FOUND,
} from '../utils/constants';
import { getTreatmentPlanByDoctorAndSurgery } from './TreatmentPlanService';
import { updateUser } from './UserService';
import { createUserTreatmentPlan } from './UserTreatmentPlanService';

export async function addQuestionnaire(data: CreateQuestionnaire[]): Promise<QuestionnaireModel[]> {
  return await Questionnaire.bulkCreate(data);
}

export async function submitQuestionnaire({
  questionnaireObj,
  user,
  doctor_id,
  surgery_id,
  user_demographics,
  user_treatment_plan_name,
}: SubmitQuestionnaireData) {
  const transaction = await sequelize.transaction();
  try {
    const questionnaire = await Questionnaire.bulkCreate(questionnaireObj, { transaction });
    await updateUser(user, user_demographics, { transaction });

    const treatmentPlan = await getTreatmentPlanByDoctorAndSurgery(doctor_id, surgery_id);
    if (!treatmentPlan) throw new APIError(400, TREATMENT_PLAN_NOT_FOUND);

    const userTreatmentPlan = await createUserTreatmentPlan(
      user.id,
      user_demographics.estimated_max_velocity,
      treatmentPlan.toJSON(),
      user_treatment_plan_name,
      { transaction }
    );

    await transaction.commit();
    return { questionnaire, userTreatmentPlan };
  } catch (err) {
    await transaction.rollback();
    if (err.name === SEQUELIZE_UNIQUE_CONSTRAINT_ERROR) {
      throw new APIError(400, TREATMENT_PLAN_ALREADY_ASSIGNED);
    }
    throw err;
  }
}

export async function isUserQuestionnaireSubmitted(user_id: number) {
  return (await Questionnaire.count({ where: { user_id } })) > 0;
}
