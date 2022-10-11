import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { SUCCESS } from '../utils/constants';
import { createQuestionnaire } from '../services/QuestionnaireService';
import { questionnaires, SubmitQuestionnaireAPIRequest } from 'libs/models/src';
import { CreateQuestionnaire } from '../models/Questionnaire';

export async function submitQuestionnaire(req: Request, res: Response) {
  const { data }: SubmitQuestionnaireAPIRequest = req.body;
  const { id: user_id } = req['user'];

  const questionnaireObj: CreateQuestionnaire[] = data.map((question) => {
    const { title, type } = questionnaires[question.id];
    return { user_id, question_title: title, response: question.response, type };
  });

  const questionnaire = await createQuestionnaire(questionnaireObj);
  return sendResponse(res, 200, SUCCESS, questionnaire);
}
