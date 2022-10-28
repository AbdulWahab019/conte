import { Router } from 'express';

import { createSubscriptionSession, isUserSubscribed } from '../controllers/SubscriptionController';
import { authorize } from '../middlewares/auth';
import { validateCreateCheckoutSessionRequest, validateIsSubscribed } from '../validations/SubscriptionValidation';

const router = Router();

router.get('/:id', validateIsSubscribed, authorize, isUserSubscribed);

router.post('/create-checkout-session', validateCreateCheckoutSessionRequest, authorize, createSubscriptionSession);

export default router;
