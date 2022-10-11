import * as express from 'express';
const router = express.Router();
import { param } from 'express-validator';

import * as SubscriptionController from '../controllers/SubscriptionController';
import { validate } from '../middlewares/validation';
import { SUBSCRIPTION_REQUIRED } from '../utils/constants';

router.get(
  '/:id',
  param('id').notEmpty().withMessage(SUBSCRIPTION_REQUIRED),
  validate,
  SubscriptionController.isUserSubscribed
);

export default router;
