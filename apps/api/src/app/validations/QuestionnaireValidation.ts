import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from './validation';

export async function validateCreateQuestionnaire(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  // 1. Data Validation
  validationPromises.push(body('data').isArray().withMessage('Data must be an array').run(req));

  // 2. Data Array Validation (Id)
  validationPromises.push(
    body('data.*.id')
      .isInt()
      .withMessage('Question Id must be an integer')
      .notEmpty()
      .withMessage('Question Id must not be empty')
      .run(req)
  );
  // 3. Data Array Validation (Response)
  validationPromises.push(
    body('data.*.response').notEmpty().withMessage('Question response must not be empty').run(req)
  );

  await Promise.all(validationPromises);
  return await validate(req, res, next);
}
