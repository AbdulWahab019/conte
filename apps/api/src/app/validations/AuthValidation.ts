import { NextFunction, Request, Response } from 'express';
import { body, Meta } from 'express-validator';

import { validate } from './validation';
import {
  CONFIRM_PASSWORD_NOT_SAME,
  EMAIL_REQUIRED,
  INVALID_PASSWORD_LENGTH,
  PASSWORD_REQUIRED,
} from '../utils/constants';

function validateConfirmPassword(value: string, { req }: Meta) {
  if (value !== req.body.password) throw new Error(CONFIRM_PASSWORD_NOT_SAME);
  return true;
}

export async function validateRegisterAccount(req: Request, res: Response, next: NextFunction) {
  const promises = [];

  // 1. Email Validation
  promises.push(body('email').notEmpty().withMessage(EMAIL_REQUIRED).run(req));

  // 2. Password Validation
  promises.push(
    body('password').notEmpty().withMessage(PASSWORD_REQUIRED).isLength({ min: 8 }).withMessage(INVALID_PASSWORD_LENGTH)
  );

  // 3. Confirm Password Validation
  promises.push(body('confirm_password').custom(validateConfirmPassword));

  await Promise.all(promises);
  return await validate(req, res, next);
}

export async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const promises = [];

  // 1. Email Validation
  promises.push(body('email').notEmpty().withMessage(EMAIL_REQUIRED).run(req));

  // 2. Password Validation
  promises.push(
    body('password').notEmpty().withMessage(PASSWORD_REQUIRED).isLength({ min: 8 }).withMessage(INVALID_PASSWORD_LENGTH)
  );

  await Promise.all(promises);
  return await validate(req, res, next);
}
