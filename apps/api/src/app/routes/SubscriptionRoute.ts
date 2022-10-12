import * as express from 'express';

import * as SubscriptionController from '../controllers/SubscriptionController';
import { authorize } from '../middlewares/auth';
import { validateIsSubscribed } from '../validations/SubscriptionValidation';

const router = express.Router();

router.get('/:id', validateIsSubscribed, authorize, SubscriptionController.isUserSubscribed);

export default router;
