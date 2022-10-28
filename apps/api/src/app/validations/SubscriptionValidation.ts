import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { CANCEL_URL_REQUIRED, SUCCESS_URL_REQUIRED } from '../utils/constants';
import { validate } from './validation';

export async function validateCreateCheckoutSessionRequest(req: Request, res: Response, next: NextFunction) {
  await Promise.all([
    body('success_url').notEmpty().withMessage(SUCCESS_URL_REQUIRED).run(req),
    body('cancel_url').notEmpty().withMessage(CANCEL_URL_REQUIRED).run(req),
  ]);

  return validate(req, res, next);
}
