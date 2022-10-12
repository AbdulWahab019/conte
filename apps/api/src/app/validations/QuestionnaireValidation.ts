import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import {
  DATA_NOT_ARRAY,
  QUESTION_ID_EMPTY,
  QUESTION_ID_NOT_INTEGER,
  QUESTION_RESPONSE_EMPTY,
} from '../utils/constants';
import { validate } from './validation';

export async function validateCreateQuestionnaire(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  // 1. Data Validation
  validationPromises.push(body('data').isArray().withMessage(DATA_NOT_ARRAY).run(req));

  // 2. Data Array Validation (Id)
  validationPromises.push(
    body('data.*.id').isInt().withMessage(QUESTION_ID_NOT_INTEGER).notEmpty().withMessage(QUESTION_ID_EMPTY).run(req)
  );
  // 3. Data Array Validation (Response)
  validationPromises.push(body('data.*.response').notEmpty().withMessage(QUESTION_RESPONSE_EMPTY).run(req));

  await Promise.all(validationPromises);
  return await validate(req, res, next);
}
