import { NextFunction, Request, Response } from 'express';
import { validationResult, body } from 'express-validator';

import { sendResponse } from '../utils/appUtils';
import { DATA_NOT_OBJECT, IS_COMPLETED, IS_SKIPPED, TASK_TYPE_NUMBER, TITLE_STRING } from '../utils/constants';

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return sendResponse(res, 400, errors.array()[0].msg);

  return next();
}

export async function validateTaskUpdate(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  validationPromises.push(body('data').isObject().withMessage(DATA_NOT_OBJECT).run(req));

  validationPromises.push(body('data.task_type').optional().isNumeric().withMessage(TASK_TYPE_NUMBER).run(req));

  validationPromises.push(body('data.title').optional().isString().withMessage(TITLE_STRING).run(req));

  validationPromises.push(body('data.is_completed').optional().isBoolean().withMessage(IS_COMPLETED).run(req));

  validationPromises.push(body('data.is_skipped').optional().isBoolean().withMessage(IS_SKIPPED).run(req));

  await Promise.all(validationPromises);
  return validate(req, res, next);
}
