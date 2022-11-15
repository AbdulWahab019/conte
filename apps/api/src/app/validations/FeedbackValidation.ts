import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { FEEDBACK_MISSING, SELECT_QUESTION, TASK_ID_MISSING, TYPE_MISSING } from '../utils/constants';

import { validate } from './validation';

export async function validateCreateFeedback(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  //   console.log('vali', req.body.data[0].type);

  if (req.body.data.length >= 1 && req.body.data.type === 2) {
    for (let index = 0; index < req.body.data.length; index++) {
      validationPromises.push(body('data.*.question').notEmpty().withMessage(SELECT_QUESTION).run(req));
      validationPromises.push(body('data.*.task_id').notEmpty().withMessage(TASK_ID_MISSING).run(req));
      validationPromises.push(body('data.*.feedback').notEmpty().withMessage(FEEDBACK_MISSING).run(req));
      validationPromises.push(body('data.*.type').notEmpty().withMessage(TYPE_MISSING).run(req));
    }

    //   if (req.body.data[0].type === 2) {
  } else {
    validationPromises.push(body('data.*.task_id').notEmpty().withMessage(TASK_ID_MISSING).run(req));
    validationPromises.push(body('data.*.feedback').notEmpty().withMessage(FEEDBACK_MISSING).run(req));
    validationPromises.push(body('data.*.type').notEmpty().withMessage(TYPE_MISSING).run(req));
  }
  await Promise.all(validationPromises);

  return validate(req, res, next);
}
