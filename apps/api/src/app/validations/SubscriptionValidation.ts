import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { INVALID_SUBSCRIPTION_ID_LENGTH, SUBSCRIPTION_REQUIRED } from '../utils/constants';
import { validate } from './validation';

export async function validateIsSubscribed(req: Request, res: Response, next: NextFunction) {
  await param('id')
    .notEmpty()
    .withMessage(SUBSCRIPTION_REQUIRED)
    .isLength({ min: 28, max: 28 })
    .withMessage(INVALID_SUBSCRIPTION_ID_LENGTH)
    .run(req);

  return validate(req, res, next);
}

export async function validateCreateCheckoutSessionRequest(req: Request, res: Response, next: NextFunction) {
  await Promise.all([
    body('success_url').notEmpty().withMessage('Success Url is required').run(req),
    body('cancel_url').notEmpty().withMessage('Cancel Url is required').run(req),
  ]);

  return validate(req, res, next);
}
