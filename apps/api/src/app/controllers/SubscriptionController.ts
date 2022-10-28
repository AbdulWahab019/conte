import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { isSubscribed } from '../services/SubscriptionService';
import { SUCCESS } from '../utils/constants';
import { createSubscriptionCheckoutSession } from '../utils/stripe';
import { CreateCheckoutSessionAPIReq } from '@conte/models';

export async function isUserSubscribed(req: Request, res: Response) {
  // TODO - Get Subscription ID from subscriptions table
  const { id } = req.params;

  const apiResp = await isSubscribed(id);
  return sendResponse(res, 200, SUCCESS, apiResp);
}

export async function createSubscriptionSession(req: Request, res: Response) {
  const { stripe_customer_id } = req['user'];
  const { success_url, cancel_url }: CreateCheckoutSessionAPIReq = req.body;

  const session = await createSubscriptionCheckoutSession(stripe_customer_id, success_url, cancel_url);
  return sendResponse(res, 200, SUCCESS, session);
}
