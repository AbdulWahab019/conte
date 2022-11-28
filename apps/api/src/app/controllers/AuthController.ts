import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { createUser, createWebUser, userLogin, webUserLogin } from '../services/AuthService';
import { AUTHENTICATED, SUCCESS } from '../utils/constants';
import { AccountLoginAPIReq, CreateAccountAPIReq } from '@conte/models';

export async function createAccount(req: Request, res: Response) {
  const { email, password }: CreateAccountAPIReq = req.body;

  const apiResp = await createUser(email, password);
  return sendResponse(res, 201, SUCCESS, apiResp);
}

export async function accountLogin(req: Request, res: Response) {
  const { email, password }: AccountLoginAPIReq = req.body;

  const apiResp = await userLogin(email, password);
  return sendResponse(res, 200, AUTHENTICATED, apiResp);
}

export async function createWebAccount(req: Request, res: Response) {
  const { email, password } = req.body;

  const apiResp = await createWebUser(email, password);
  return sendResponse(res, 201, SUCCESS, apiResp);
}

export async function webAccountLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  const apiResp = await webUserLogin(email, password);
  return sendResponse(res, 200, AUTHENTICATED, apiResp);
}
