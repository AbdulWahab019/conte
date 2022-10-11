import { NextFunction, Request, Response } from 'express';
import { Meta, validationResult } from 'express-validator';

import { sendResponse } from '../utils/appUtils';
import { BAD_REQUEST, CONFIRM_PASSWORD_NOT_SAME } from '../utils/constants';

export async function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendResponse(res, 400, BAD_REQUEST, undefined, errors.array());

  next();
}

export function validateConfirmPassword(value: string, { req }: Meta) {
  if (value !== req.body.password) throw new Error(CONFIRM_PASSWORD_NOT_SAME);
  return true;
}
