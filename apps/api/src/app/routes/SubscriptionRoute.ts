import * as express from 'express';
const router = express.Router();
import { param } from 'express-validator';

import * as SubscriptionController from '../controllers/SubscriptionController';
import { validate } from '../middlewares/validation';

router.get(
  '/:id',
  param('id').notEmpty().withMessage('SUBSCRIPTION_ID is required.'),
  validate,
  SubscriptionController.isUserSubscribed
);

export default router;
