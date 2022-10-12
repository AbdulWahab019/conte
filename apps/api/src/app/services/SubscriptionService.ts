import { getSubscriptionById } from '../utils/stripe';
import { APIError } from '../utils/apiError';
import { ACTIVE } from '../utils/constants';

export async function isSubscribed(sub_id: string) {
  try {
    let is_subscribed = false;

    const subscription = await getSubscriptionById(sub_id);
    if (subscription.status === ACTIVE) is_subscribed = true;

    return { is_subscribed };
  } catch (err) {
    throw new APIError(err.statusCode, err.type, err);
  }
}
