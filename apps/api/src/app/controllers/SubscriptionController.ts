import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { isSubscribed } from '../services/SubscriptionService';
import { SUCCESS } from '../utils/constants';

export async function isUserSubscribed(req: Request, res: Response) {
  const { id } = req.params;

  const apiResp = await isSubscribed(id);
  return sendResponse(res, 200, SUCCESS, apiResp);
}
