import { sendResponse } from '../utils/appUtils';
import { isSubscribed } from '../services/SubscriptionService';

async function isUserSubscribed(req, res) {
  const { id } = req.params;

  const apiResp = await isSubscribed(id);

  return sendResponse(res, 200, 'Success', apiResp);
}

export { isUserSubscribed };
