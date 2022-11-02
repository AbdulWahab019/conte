import { Router } from 'express';

import { stripeWebhookListener } from '../controllers/WebhookController';

const router = Router();

router.post('/stripe-event-listener', stripeWebhookListener);

export default router;
