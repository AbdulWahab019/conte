import { Router } from 'express';

import { createSubscriptionSession, isUserSubscribed } from '../controllers/SubscriptionController';
import { authorize } from '../middlewares/auth';
import { validateCreateCheckoutSessionRequest } from '../validations/SubscriptionValidation';

const router = Router();

router.get('/status', authorize, isUserSubscribed);

router.post('/create-checkout-session', validateCreateCheckoutSessionRequest, authorize, createSubscriptionSession);

export default router;
