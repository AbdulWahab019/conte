import Stripe from 'stripe';
import { environment } from '../../config/config';

const stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
  apiVersion: null,
});

async function getSubscriptionById(sub_id: string) {
  return await stripe.subscriptions.retrieve(sub_id);
}

export { getSubscriptionById };
