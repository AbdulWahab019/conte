import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { createUser, isTermsOfUseAccepted, loginUser } from '../services/UserService';
import { AUTHENTICATED, BAD_REQUEST, SOMETHING_WENT_WRONG, SUCCESS } from '../utils/constants';

async function createAccount(req: Request, res: Response) {
  const { email, password } = req.body;

  const apiResp = await createUser(email, password);
  return sendResponse(res, 201, SUCCESS, apiResp);
}

async function accountLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  const apiResp = await loginUser(email, password);
  return sendResponse(res, 201, AUTHENTICATED, apiResp);
}

async function acceptTermsOfUse(req: Request, res: Response) {
  const { user_id } = req.params;

  const resp = await isTermsOfUseAccepted(Number(user_id), true);

  if (!resp) return sendResponse(res, 400, BAD_REQUEST, null, SOMETHING_WENT_WRONG);

  return sendResponse(res, 200, SUCCESS);
}

export { createAccount, accountLogin, acceptTermsOfUse };
