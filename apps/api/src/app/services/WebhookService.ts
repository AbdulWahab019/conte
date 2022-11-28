import Stripe from 'stripe';
import { User } from '../models/User';
import { APIError } from '../utils/apiError';
import { constructWebhookEvent } from '../utils/stripe';

export async function handleStripeListenerEvent(
  payload: string,
  signature: string | Array<string>,
  webhookSecret: string
) {
  let event: Stripe.Event;
  try {
    event = constructWebhookEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed: ${err.raw.message}`);
    throw new APIError(400, 'Webhook Error');
  }

  const data: any = event.data;
  const eventType: string = event.type;

  switch (eventType) {
    case 'checkout.session.completed':
      await User.update(
        {
          stripe_customer_id: data.object.customer,
          stripe_subscription_id: data.object.subscription,
          is_subscribed: true,
        },
        { where: { id: data.object.metadata.user_id } }
      );
      break;
    case 'customer.subscription.deleted':
      await User.update({ is_subscribed: false }, { where: { id: data.object.metadata.user_id } });
      break;
    default:
      console.log('Unhandled event type: ', eventType);
  }

  return true;
}
