import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { isOrientationVideoWatched, isTermsOfUseAccepted } from '../services/UserService';
import { BAD_REQUEST, SOMETHING_WENT_WRONG, SUCCESS } from '../utils/constants';

export async function acceptTermsOfUse(req: Request, res: Response) {
  const { id: user_id } = req['user'];

  const resp = await isTermsOfUseAccepted(Number(user_id), true);

  if (!resp) return sendResponse(res, 400, BAD_REQUEST, null, new Error(SOMETHING_WENT_WRONG));

  return sendResponse(res, 200, SUCCESS);
}

export async function watchOrientationVideo(req: Request, res: Response) {
  const { id: user_id } = req['user'];

  const resp = await isOrientationVideoWatched(Number(user_id), true);
  if (!resp) return sendResponse(res, 400, BAD_REQUEST, null, new Error(SOMETHING_WENT_WRONG));

  return sendResponse(res, 200, SUCCESS);
}
