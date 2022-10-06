import Stripe from 'stripe';
import { environment } from '../../environments/environment';

const stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
  apiVersion: null,
});

async function getSubscriptionById(sub_id: string) {
  return stripe.subscriptions.retrieve(sub_id);
}

export { getSubscriptionById };
