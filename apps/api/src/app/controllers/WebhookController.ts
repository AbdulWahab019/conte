import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { SUCCESS } from '../utils/constants';
import { handleStripeListenerEvent } from '../services/WebhookService';
import { environment } from '../../config/config';

export async function stripeWebhookListener(req: Request, res: Response) {
  const webhookSecret = environment.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers['stripe-signature'];

  await handleStripeListenerEvent(req['rawBody'], signature, webhookSecret);
  return sendResponse(res, 200, SUCCESS);
}
