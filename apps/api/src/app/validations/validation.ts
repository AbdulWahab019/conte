import { NextFunction, Request, Response } from 'express';
import { validationResult, body } from 'express-validator';

import { sendResponse } from '../utils/appUtils';
import { DATA_NOT_OBJECT } from '../utils/constants';

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return sendResponse(res, 400, errors.array()[0].msg);

  next();
}

export async function validateTaskUpdate(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  validationPromises.push(body('data').isObject().withMessage(DATA_NOT_OBJECT).run(req));

  validationPromises.push(body('data..details.*.tasks.*.task_type').optional().run(req));

  validationPromises.push(body('data.details.*.tasks.*.title').optional().run(req));

  validationPromises.push(body('data.details.*.tasks.*.is_completed').optional().run(req));

  validationPromises.push(body('data.details.*.tasks.*.is_skipped').optional().run(req));

  await Promise.all(validationPromises);
  return validate(req, res, next);
}
