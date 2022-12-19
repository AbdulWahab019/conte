import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import * as constants from '../utils/constants';
import { validate } from './validation';

export async function validateTaskUpdate(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  validationPromises.push(body('data').isObject().withMessage(constants.DATA_NOT_OBJECT).run(req));

  validationPromises.push(
    body('data.task_type').optional().isNumeric().withMessage(constants.TASK_TYPE_NUMBER).run(req)
  );

  validationPromises.push(body('data.title').optional().isString().withMessage(constants.TITLE_STRING).run(req));

  validationPromises.push(
    body('data.is_completed').optional().isBoolean().withMessage(constants.IS_COMPLETED).run(req)
  );

  validationPromises.push(body('data.is_skipped').optional().isBoolean().withMessage(constants.IS_SKIPPED).run(req));

  await Promise.all(validationPromises);
  return validate(req, res, next);
}
