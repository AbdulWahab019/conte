import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { createUserAccount, loginUser } from '../services/UserAccountService';

async function createAccount(req: Request, res: Response) {
  const { email, password } = req.body;

  const apiResp = await createUserAccount(email, password);
  return sendResponse(res, 201, 'Success', apiResp);
}

async function accountLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  const apiResp = await loginUser(email, password);
  return sendResponse(res, 201, 'Authenticated', apiResp);
}

export { createAccount, accountLogin };
