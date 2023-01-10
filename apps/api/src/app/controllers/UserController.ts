import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import {
  getUsersData,
  getUserTPDetailsWeb,
  isOrientationVideoWatched,
  isTermsOfUseAccepted,
  renderTPDetails,
  updateTaskWeb,
} from '../services/UserService';
import { BAD_REQUEST, SOMETHING_WENT_WRONG, SUCCESS } from '../utils/constants';
import { APIError } from '../utils/apiError';
import { isUserQuestionnaireSubmitted } from '../services/QuestionnaireService';
import { UserModel } from '../models/User';
import { captureException } from '@sentry/node';
import {
  createTPDay,
  createUserTasks,
  doesTpDayExists,
  getUserTreatmentPlanByID,
  reAssignTask,
  updateUserTPDetails,
} from '../services/UserTreatmentPlanService';
import moment = require('moment');

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

  const userData = await getUserTPDetailsWeb(Number(user_id));

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

    const apiResp = await renderTPDetails(Number(user_id));
    res.contentType('text/csv');
    return res.status(200).send(apiResp);
  } catch (error) {
    captureException(error);
    return console.error(error);
  }
}

export async function createUserTreatmentPlanTasks(req: Request, res: Response) {
  const { user_tp_id, user_id } = req.params;
  const { tp_day, tasks = [] } = req.body;

  if (!tasks.length) return sendResponse(res, 200, SUCCESS, []);

  let tpDay = await doesTpDayExists(tp_day, Number(user_tp_id));

  if (!tpDay) {
    const { assigned_at } = await getUserTreatmentPlanByID(Number(user_tp_id));

    const formattedTpDay = moment(assigned_at)
      .add(tp_day - 1, 'days')
      .format('dddd');

    tpDay = await createTPDay(Number(user_tp_id), tp_day, formattedTpDay);
  }

  const tasksDetails = tasks.map((task) => {
    return {
      user_id: Number(user_id),
      user_tp_id: Number(user_tp_id),
      tp_day: tp_day || tpDay.tp_day,
      ...task,
    };
  });

  const apiResp = await createUserTasks(tasksDetails);

  return sendResponse(res, 200, SUCCESS, apiResp);
}

export async function updateUserTreatmentPlanDetails(req: Request, res: Response) {
  const { user_tp_id, id } = req.params;
  const data = req.body;

  await updateUserTPDetails(Number(user_tp_id), Number(id), data);

  return sendResponse(res, 200, SUCCESS);
}

export async function reAssignUserTask(req: Request, res: Response) {
  const { tp_day, task_ids = [] } = req.body;

  await reAssignTask(tp_day, task_ids);

  return sendResponse(res, 200, SUCCESS);
}
