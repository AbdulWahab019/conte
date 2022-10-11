import { APIError } from '../utils/apiError';
import { getSubscriptionById } from '../utils/stripe';

async function isSubscribed(sub_id: string) {
  try {
    let is_subscribed = false;

    const subscription = await getSubscriptionById(sub_id);
    if (subscription.status === 'active') is_subscribed = true;

    return { is_subscribed };
  } catch (err) {
    throw new APIError(err.statusCode, err.type, err);
  }
}

export { isSubscribed };
