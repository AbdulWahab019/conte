import { NextFunction, Request, Response } from 'express';
import { validationResult, body } from 'express-validator';

import { sendResponse } from '../utils/appUtils';
import {
  BULLPEN,
  BULLPEN_MAX_VELOCITY,
  BULLPEN_MAX_VELOCITY_ABSOLUTE,
  BULLPEN_PITCHES,
  DATA_NOT_OBJECT,
  INNINGS,
  IS_COMPLETED,
  IS_SKIPPED,
  LIVE_SIMULATED_GAME,
  MAX_DISTANCE_NUMBER,
  MAX_VELOCITY_NUMBER,
  MONTH_FROM_SX_NUMBER,
  MONTH_OF_THROWING_NUMBER,
  PLYO_THROW_NUMBER,
  POST_MAX_DISTANCE_FLAT_GROUND_NUMBER,
  POST_MAX_DISTANCE_FLAT_GROUND_PITCHES,
  POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_ABSOLUTE,
  POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_NUMBER,
  TASK_TYPE_NUMBER,
  TITLE_STRING,
  TP_DAY_NOT_UPDATE,
  TP_ID_NOT_UPDATE,
  TP_WEEKDAY_NOT_UPDATE,
  VIDEO_URL,
  WEEK_FROM_SX_NUMBER,
  WEEK_OF_THROWING_NUMBER,
} from '../utils/constants';

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

export async function validateTreatmentPlanData(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  validationPromises.push(body('data').isObject().withMessage(DATA_NOT_OBJECT).run(req));

  validationPromises.push(body('data.tp_id').not().exists().withMessage(TP_ID_NOT_UPDATE).run(req));

  validationPromises.push(body('data.tp_day').not().exists().withMessage(TP_DAY_NOT_UPDATE).run(req));

  validationPromises.push(body('data.tp_weekday').not().exists().withMessage(TP_WEEKDAY_NOT_UPDATE).run(req));

  validationPromises.push(body('data.week_from_sx').optional().isNumeric().withMessage(WEEK_FROM_SX_NUMBER).run(req));

  validationPromises.push(body('data.month_from_sx').optional().isNumeric().withMessage(MONTH_FROM_SX_NUMBER).run(req));

  validationPromises.push(
    body('data.week_of_throwing').optional().isNumeric().withMessage(WEEK_OF_THROWING_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.month_of_throwing').optional().isNumeric().withMessage(MONTH_OF_THROWING_NUMBER).run(req)
  );

  validationPromises.push(body('data.plyo_throw').optional().isNumeric().withMessage(PLYO_THROW_NUMBER).run(req));

  validationPromises.push(body('data.max_distance').optional().isNumeric().withMessage(MAX_DISTANCE_NUMBER).run(req));

  validationPromises.push(
    body('data.max_velocity_percent').optional().isNumeric().withMessage(MAX_VELOCITY_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.max_velocity_absolute').optional().isNumeric().withMessage(MAX_VELOCITY_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.num_throws_at_max_distance')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_distance_flat_ground')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_distance_flat_ground_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_distance_flat_ground_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_ABSOLUTE)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_flat_ground_pitches')
      .optional()
      .isString()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_PITCHES)
      .run(req)
  );

  validationPromises.push(body('data.bullpen').optional().isNumeric().withMessage(BULLPEN).run(req));

  validationPromises.push(
    body('data.bullpen_max_velocity_percent').optional().isNumeric().withMessage(BULLPEN_MAX_VELOCITY).run(req)
  );

  validationPromises.push(
    body('data.bullpen_max_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(BULLPEN_MAX_VELOCITY_ABSOLUTE)
      .run(req)
  );

  validationPromises.push(body('data.bullpen_pitches').optional().isString().withMessage(BULLPEN_PITCHES).run(req));

  validationPromises.push(
    body('data.live_simulated_game').optional().isNumeric().withMessage(LIVE_SIMULATED_GAME).run(req)
  );

  validationPromises.push(body('data.innings').optional().isNumeric().withMessage(INNINGS).run(req));

  validationPromises.push(body('data.video_url').optional().isString().withMessage(VIDEO_URL).run(req));

  await Promise.all(validationPromises);
  return validate(req, res, next);
}
