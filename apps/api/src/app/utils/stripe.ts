import Stripe from 'stripe';
import { environment } from '../../config/config';

const stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
  apiVersion: null,
});

export async function getSubscriptionById(sub_id: string) {
  return await stripe.subscriptions.retrieve(sub_id);
}

export async function createSubscriptionCheckoutSession(customer_id: string, success_url: string, cancel_url: string) {
  return await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: 'price_1Lnkt2DYXkLuaaio98IVVgWl', quantity: 1 }],
    ...Object.assign({}, customer_id ? { customer: customer_id } : {}),
    success_url,
    cancel_url,
  });
}
