import { Router } from 'express';

import { isUserSubscribed } from '../controllers/SubscriptionController';
import { authorize } from '../middlewares/auth';
import { validateIsSubscribed } from '../validations/SubscriptionValidation';

const router = Router();

router.get('/:id', validateIsSubscribed, authorize, isUserSubscribed);

export default router;
