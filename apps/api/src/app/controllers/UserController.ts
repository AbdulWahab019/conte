import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { isOrientationVideoWatched, isTermsOfUseAccepted } from '../services/UserService';
import { BAD_REQUEST, SOMETHING_WENT_WRONG, SUCCESS } from '../utils/constants';
import { APIError } from '../utils/apiError';
import { isUserQuestionnaireSubmitted } from '../services/QuestionnaireService';
import { UserModel } from '../models/User';

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
