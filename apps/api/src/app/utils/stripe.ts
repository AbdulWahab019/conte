import Stripe from 'stripe';

import { environment } from '../../config/config';

const stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
  apiVersion: null,
});

export async function getSubscriptionById(sub_id: string) {
  return await stripe.subscriptions.retrieve(sub_id);
}

export async function createSubscriptionCheckoutSession(
  user: { email: string; user_id: number },
  customer_id: string,
  success_url: string,
  cancel_url: string
) {
  return await stripe.checkout.sessions.create({
    mode: 'subscription',
    subscription_data: { trial_period_days: 3 },
    line_items: [{ price: 'price_1Lnkt2DYXkLuaaio98IVVgWl', quantity: 1 }],
    ...Object.assign({}, customer_id ? { customer: customer_id } : {}),
    metadata: { user_id: user.user_id, email: user.email },
    success_url,
    cancel_url,
  });
}

export function constructWebhookEvent(body: string | Buffer, signature: string | Array<string>, webhookSecret: string) {
  return stripe.webhooks.constructEvent(body, signature, webhookSecret);
}
