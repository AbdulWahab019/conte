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

  // 7. User Demographics Validation
  validationPromises.push(
    body('user_demographics').isObject().withMessage('User Demographics is invalid.').run(req),
    body('user_demographics.first_name')
      .isString()
      .withMessage('First Name is required')
      .isLength({ min: 2, max: 20 })
      .withMessage('First Name should be between 2 and 20 letters.')
      .run(req),
    body('user_demographics.last_name')
      .isString()
      .withMessage('Last Name is required')
      .isLength({ min: 2, max: 20 })
      .withMessage('Last Name should be between 2 and 20 letters.')
      .run(req),
    body('user_demographics.cell_phone').isMobilePhone('en-US').withMessage('Invalid Phone Number').run(req),
    body('user_demographics.birth_date').isDate({ format: 'YYYY-MM-DD' }).withMessage('Invalid Date of Birth').run(req),
    body('user_demographics.address').isString().withMessage('Address can be max 120 letters.').run(req),
    body('user_demographics.city').isString().withMessage('City can be max 20 letters.').run(req),
    body('user_demographics.state').isString().withMessage('State can be max 15 letters.').run(req),
    body('user_demographics.zip_code').isPostalCode('US').withMessage('Invalid Zip Code').run(req),
    body('user_demographics.estimated_max_velocity').isInt().withMessage('Invalid Estimated Max Velocity').run(req),
    body('user_demographics')
      .custom((value) => Object.keys(value).length === 9)
      .withMessage('Invalid User Demographics')
      .run(req)
  );

  await Promise.all(validationPromises);
  return await validate(req, res, next);
}
