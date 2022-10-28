import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import {
  CANCEL_URL_REQUIRED,
  INVALID_SUBSCRIPTION_ID_LENGTH,
  SUBSCRIPTION_REQUIRED,
  SUCCESS_URL_REQUIRED,
} from '../utils/constants';
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
    body('success_url').notEmpty().withMessage(SUCCESS_URL_REQUIRED).run(req),
    body('cancel_url').notEmpty().withMessage(CANCEL_URL_REQUIRED).run(req),
  ]);

  return validate(req, res, next);
}
