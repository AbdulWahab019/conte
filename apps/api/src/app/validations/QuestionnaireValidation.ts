import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import {
  DATA_NOT_ARRAY,
  DOCTOR_ID_EMPTY,
  DOCTOR_ID_NOT_INTEGER,
  QUESTION_ID_EMPTY,
  QUESTION_ID_NOT_INTEGER,
  QUESTION_RESPONSE_EMPTY,
  SURGERY_ID_NOT_INTEGER,
  TREATMENT_PLAN_NAME_INVALID,
  TREATMENT_PLAN_NAME_INVALID_LENGTH,
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

export async function validateSubmitQuestionnaire(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  // 1. Data Validation
  validationPromises.push(body('data').isArray().withMessage(DATA_NOT_ARRAY).run(req));

  // 2. Data Array Validation (Id)
  validationPromises.push(
    body('data.*.id').isInt().withMessage(QUESTION_ID_NOT_INTEGER).notEmpty().withMessage(QUESTION_ID_EMPTY).run(req)
  );

  // 3. Data Array Validation (Response)
  validationPromises.push(body('data.*.response').notEmpty().withMessage(QUESTION_RESPONSE_EMPTY).run(req));

  // 4. Doctor Id Validation
  validationPromises.push(
    body('doctor_id').isInt().withMessage(DOCTOR_ID_NOT_INTEGER).notEmpty().withMessage(DOCTOR_ID_EMPTY).run(req)
  );

  // 5. Surgery Id Validation
  validationPromises.push(body('surgery_id').optional().isInt().withMessage(SURGERY_ID_NOT_INTEGER).run(req));

  // 6. User Treatment Plan Name Validation
  validationPromises.push(
    body('user_treatment_plan_name')
      .optional()
      .isString()
      .withMessage(TREATMENT_PLAN_NAME_INVALID)
      .isLength({ min: 5, max: 30 })
      .withMessage(TREATMENT_PLAN_NAME_INVALID_LENGTH)
      .run(req)
  );

  await Promise.all(validationPromises);
  return await validate(req, res, next);
}
