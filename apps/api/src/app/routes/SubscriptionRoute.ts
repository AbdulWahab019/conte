import * as express from 'express';

import * as SubscriptionController from '../controllers/SubscriptionController';
import { validateIsSubscribed } from '../validations/SubscriptionValidation';

const router = express.Router();

router.get('/:id', validateIsSubscribed, SubscriptionController.isUserSubscribed);

export default router;
