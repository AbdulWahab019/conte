import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { isOrientationVideoWatched, isTermsOfUseAccepted } from '../services/UserService';
import { BAD_REQUEST, SOMETHING_WENT_WRONG, SUCCESS } from '../utils/constants';
import { APIError } from '../utils/apiError';
import { getUserQuestionnaireStatus } from '../services/QuestionnaireService';

export async function getUser(req: Request, res: Response) {
  const user = req['user'];
  const is_questionnaire_submitted = await getUserQuestionnaireStatus(user.id);

  const resp = {
    email: user.email,
    is_terms_of_use_accepted: user.is_terms_of_use_accepted,
    is_orientation_video_watched: user.is_orientation_video_watched,
    is_questionnaire_submitted,
  };

  return sendResponse(res, 200, SUCCESS, resp);
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
