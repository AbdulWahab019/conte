import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { FEEDBACK_REQUIRED, QUESTION_REQUIRED, TASK_ID_REQUIRED, TYPE_REQUIRED } from '../utils/constants';

import { validate } from './validation';

export async function validateCreateFeedback(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  // TODO - Refactor this after creating table & APIs for feedback and comments.

  if (req.body.data.length >= 1 && req.body.data.type === 2) {
    validationPromises.push(body('data.*.question').notEmpty().withMessage(QUESTION_REQUIRED).run(req));
    validationPromises.push(body('data.*.task_id').notEmpty().withMessage(TASK_ID_REQUIRED).run(req));
    validationPromises.push(body('data.*.feedback').notEmpty().withMessage(FEEDBACK_REQUIRED).run(req));
    validationPromises.push(body('data.*.type').notEmpty().withMessage(TYPE_REQUIRED).run(req));
  } else {
    validationPromises.push(body('data.*.task_id').notEmpty().withMessage(TASK_ID_REQUIRED).run(req));
    validationPromises.push(body('data.*.feedback').notEmpty().withMessage(FEEDBACK_REQUIRED).run(req));
    validationPromises.push(body('data.*.type').notEmpty().withMessage(TYPE_REQUIRED).run(req));
  }
  await Promise.all(validationPromises);

  return validate(req, res, next);
}
