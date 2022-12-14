import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import {
  getUsersData,
  getUserTPData,
  isOrientationVideoWatched,
  isTermsOfUseAccepted,
  updateTaskWeb,
} from '../services/UserService';
import { BAD_REQUEST, SOMETHING_WENT_WRONG, SUCCESS } from '../utils/constants';
import { APIError } from '../utils/apiError';
import { isUserQuestionnaireSubmitted } from '../services/QuestionnaireService';
import { UserModel } from '../models/User';
import moment = require('moment');
import { captureException } from '@sentry/node';

export async function getUserProfile(req: Request, res: Response) {
  const user: UserModel = req['user'];
  const is_questionnaire_submitted = await isUserQuestionnaireSubmitted(user.id);

  const apiResp = { ...user.toJSON(), is_questionnaire_submitted };
  return sendResponse(res, 200, SUCCESS, apiResp);
}

export async function acceptTermsOfUse(req: Request, res: Response) {
  const { id: user_id } = req['user'];

  const resp = await isTermsOfUseAccepted(Number(user_id), true);

  if (!resp) throw new APIError(400, BAD_REQUEST, new Error(SOMETHING_WENT_WRONG));

  return sendResponse(res, 200, SUCCESS);
}

export async function watchOrientationVideo(req: Request, res: Response) {
  const { id: user_id } = req['user'];

  const resp = await isOrientationVideoWatched(Number(user_id), true);
  if (!resp) throw new APIError(400, BAD_REQUEST, new Error(SOMETHING_WENT_WRONG));

  return sendResponse(res, 200, SUCCESS);
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await getUsersData();

  return sendResponse(res, 200, SUCCESS, { users });
}

export async function getUserTreatmentPlanDetails(req: Request, res: Response) {
  const { user_id } = req.params;

  const userData = await getUserTPData(Number(user_id));

  return sendResponse(res, 200, SUCCESS, userData);
}

export async function updateUserTPTask(req: Request, res: Response) {
  const { user_id, task_id } = req.params;
  const { data } = req.body;

  const dataObj = {
    task_type: data.task_type,
    title: data.title,
    is_completed: data.is_completed,
    is_skipped: data.is_skipped,
  };

  const apiResp = await updateTaskWeb(Number(user_id), Number(task_id), dataObj);

  return sendResponse(res, 200, SUCCESS, apiResp);
}

export async function renderUserTreatmentPlanDetails(req: Request, res: Response) {
  try {
    const { user_id } = req.params;

    const dataObj = (await getUserTPData(Number(user_id))).toJSON();

    const header = 'User Treatment Plan';

    const tp_details = `Name, ${dataObj.name}
    Assigned At, ${moment(dataObj.assigned_at).format('YYYY-MM-DD')}`;

    const task_header = 'Tasks Report';

    const task_table_header = 'Treatment Plan Day, Type, Title, Is_Completed, Is_Skipped';

    let task_records = '';

    dataObj.details.forEach((detail) => {
      detail.tasks.forEach((task) => {
        task_records += `${detail.tp_day}, ${task.task_type}, ${task.title}, ${task.is_completed},${task.is_skipped} \n`;
      });
    });

    // CSV Styling
    const csv_string = `${header}
    
    ${tp_details}
    
    
    ${task_header}
    
    ${task_table_header}
    ${task_records}\n`;

    res.contentType('text/csv');
    return res.status(200).send(csv_string);
  } catch (error) {
    captureException(error);
    return console.error(error);
  }
}
