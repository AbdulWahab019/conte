import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { isSubscribed } from '../services/SubscriptionService';
import { SUCCESS } from '../utils/constants';
import { createSubscriptionCheckoutSession } from '../utils/stripe';
import { CreateCheckoutSessionAPIReq } from '@conte/models';
import { UserModel } from '../models/User';

export async function isUserSubscribed(req: Request, res: Response) {
  const { stripe_subscription_id }: UserModel = req['user'];

  if (!stripe_subscription_id) return sendResponse(res, 200, SUCCESS, { is_subscribed: false });

  const apiResp = await isSubscribed(stripe_subscription_id);
  return sendResponse(res, 200, SUCCESS, apiResp);
}

export async function createSubscriptionSession(req: Request, res: Response) {
  const { id: user_id, email, stripe_customer_id } = req['user'];
  const { success_url, cancel_url }: CreateCheckoutSessionAPIReq = req.body;

  const session = await createSubscriptionCheckoutSession(
    { user_id, email },
    stripe_customer_id,
    success_url,
    cancel_url
  );
  return sendResponse(res, 200, SUCCESS, session);
}
