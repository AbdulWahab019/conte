import { Request, Response } from 'express';

import { CreateQuestionnaireAPIRequest, questionnaires, SubmitQuestionnaireAPIRequest } from '@conte/models';
import { sendResponse } from '../utils/appUtils';
import { SUCCESS } from '../utils/constants';
import { CreateQuestionnaire } from '../models/Questionnaire';
import { addQuestionnaire, submitQuestionnaire } from '../services/QuestionnaireService';

import { UserModel } from '../models/User';

export async function createQuestionnaireHttpReq(req: Request, res: Response) {
  const { id: user_id } = req['user'];
  const { data }: CreateQuestionnaireAPIRequest = req.body;

  const questionnaireObj: CreateQuestionnaire[] = data.map((question) => {
    const { title, type } = questionnaires[question.id];
    return { user_id, question_title: title, response: question.response, type };
  });

  const questionnaire = await addQuestionnaire(questionnaireObj);
  return sendResponse(res, 200, SUCCESS, questionnaire);
}

export async function submitQuestionnaireHttpReq(req: Request, res: Response) {
  const user: UserModel = req['user'];
  const {
    data,
    doctor_id,
    surgery_id,
    user_demographics,
    user_treatment_plan_name = 'User Treatment Plan',
  }: SubmitQuestionnaireAPIRequest = req.body;

  let surgery_date = null;
  const questionnaireObj: CreateQuestionnaire[] = data.map((question) => {
    if (question.id === 1) surgery_date = question.response;

    const { title, type } = questionnaires[question.id];
    return { user_id: user.id, question_title: title, response: question.response, type };
  });

  const apiResp = await submitQuestionnaire({
    questionnaireObj,
    user,
    doctor_id,
    surgery_id,
    user_demographics,
    user_treatment_plan_name,
    surgery_date,
  });
  return sendResponse(res, 200, SUCCESS, apiResp);
}
