import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { INVALID_SUBSCRIPTION_ID_LENGTH, SUBSCRIPTION_REQUIRED } from '../utils/constants';
import { validate } from './validation';

export async function validateIsSubscribed(req: Request, res: Response, next: NextFunction) {
  await param('id')
    .notEmpty()
    .withMessage(SUBSCRIPTION_REQUIRED)
    .isLength({ min: 28, max: 28 })
    .withMessage(INVALID_SUBSCRIPTION_ID_LENGTH)
    .run(req);

  return await validate(req, res, next);
}
