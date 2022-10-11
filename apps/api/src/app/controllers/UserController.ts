import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { createUser, loginUser } from '../services/UserService';

async function createAccount(req: Request, res: Response) {
  const { email, password } = req.body;

  const apiResp = await createUser(email, password);
  return sendResponse(res, 201, 'Success', apiResp);
}

async function accountLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  const apiResp = await loginUser(email, password);
  return sendResponse(res, 201, 'Authenticated', apiResp);
}

export { createAccount, accountLogin };
