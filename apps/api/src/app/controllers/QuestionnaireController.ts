import { Request, Response } from 'express';

import { CreateQuestionnaireAPIRequest, questionnaires, SubmitQuestionnaireAPIRequest } from '@conte/models';
import { sendResponse } from '../utils/appUtils';
import {
  INTERNAL_SERVER_ERROR,
  SEQUELIZE_UNIQUE_CONSTRAINT_ERROR,
  SUCCESS,
  TREATMENT_PLAN_ALREADY_ASSIGNED,
} from '../utils/constants';
import { CreateQuestionnaire } from '../models/Questionnaire';
import * as QuestionnaireService from '../services/QuestionnaireService';
import * as TreatmentPlanService from '../services/TreatmentPlanService';
import * as UserTreatmentPlanService from '../services/UserTreatmentPlanService';
import { sequelize } from '../models';
import { APIError } from '../utils/apiError';

export async function createQuestionnaire(req: Request, res: Response) {
  const { id: user_id } = req['user'];
  const { data }: CreateQuestionnaireAPIRequest = req.body;

  const questionnaireObj: CreateQuestionnaire[] = data.map((question) => {
    const { title, type } = questionnaires[question.id];
    return { user_id, question_title: title, response: question.response, type };
  });

  const transaction = await sequelize.transaction();
  try {
    const questionnaire = await QuestionnaireService.createQuestionnaire(questionnaireObj, { transaction });

    await transaction.commit();
    return sendResponse(res, 200, SUCCESS, questionnaire);
  } catch (err) {
    await transaction.rollback();
    throw new APIError(500, INTERNAL_SERVER_ERROR, err);
  }
}

export async function submitQuestionnaire(req: Request, res: Response) {
  const { id: user_id } = req['user'];
  const {
    data,
    doctor_id,
    surgery_id,
    user_treatment_plan_name = 'User Treatment Plan',
  }: SubmitQuestionnaireAPIRequest = req.body;

  const questionnaireObj: CreateQuestionnaire[] = data.map((question) => {
    const { title, type } = questionnaires[question.id];
    return { user_id, question_title: title, response: question.response, type };
  });

  const transaction = await sequelize.transaction();
  try {
    const questionnaire = await QuestionnaireService.createQuestionnaire(questionnaireObj, { transaction });
    // TODO - Add Demographics data in users table

    const treatmentPlan = await TreatmentPlanService.getTreatmentPlanByDoctorAndSurgery(doctor_id, surgery_id);
    // TODO - If treatment plan is not found?

    const userTreatmentPlan = await UserTreatmentPlanService.createUserTreatmentPlan(
      user_id,
      treatmentPlan.toJSON(),
      user_treatment_plan_name,
      { transaction }
    );

    await transaction.commit();
    return sendResponse(res, 200, SUCCESS, { questionnaire, userTreatmentPlan });
  } catch (err) {
    await transaction.rollback();
    if (err.name === SEQUELIZE_UNIQUE_CONSTRAINT_ERROR) throw new APIError(400, TREATMENT_PLAN_ALREADY_ASSIGNED);

    throw new APIError(500, INTERNAL_SERVER_ERROR, err);
  }
}
