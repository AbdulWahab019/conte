import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: null,
});

async function getSubscriptionById(sub_id) {
  return stripe.subscriptions.retrieve(sub_id);
}

export { getSubscriptionById };
