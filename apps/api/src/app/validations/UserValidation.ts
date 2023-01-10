import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import {
  BULLPEN_MAX_VELOCITY_ABSOLUTE_NOT_NUMBER,
  BULLPEN_MAX_VELOCITY_NOT_NUMBER,
  BULLPEN_NOT_NUMBER,
  BULLPEN_PITCHES_NOT_STRING,
  DATA_NOT_OBJECT,
  INNINGS_NOT_NUMBER,
  IS_COMPLETED,
  IS_SKIPPED,
  LIVE_SIMULATED_GAME_NOT_NUMBER,
  MAX_DISTANCE_NOT_NUMBER,
  MAX_VELOCITY_ABSOLUTE_NOT_NUMBER,
  MAX_VELOCITY_PERCENT_NOT_NUMBER,
  MONTH_FROM_SX__NOT_NUMBER,
  NUM_OF_THROWS_NOT_NUMBER,
  PLYO_THROW_NOT_NUMBER,
  POST_MAX_DISTANCE_FLAT_GROUND_NOT_NUMBER,
  POST_MAX_DISTANCE_FLAT_GROUND_PITCHES_NOT_STRING,
  POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_ABSOLUTE_NOT_NUMBER,
  POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_PERCENT_NOT_NUMBER,
  TASK_TYPE_NUMBER,
  TITLE_STRING,
  TP_DAY_NOT_NUMBER,
  TP_DAY_NOT_UPDATE,
  TP_WEEKDAY_NOT_UPDATE,
  USER_TP_ID_NOT_UPDATE,
  VIDEO_URL_NOT_STRING,
  WEEK_FROM_SX_NOT_NUMBER,
} from '../utils/constants';
import { validate } from './validation';

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

export async function validateUserTreatmentPlanUpdate(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  validationPromises.push(body('task.*.user_tp_id').not().exists().withMessage(USER_TP_ID_NOT_UPDATE).run(req));

  validationPromises.push(body('task.*.tp_day').not().exists().withMessage(TP_DAY_NOT_UPDATE).run(req));

  validationPromises.push(
    body('task.*.tp_weekday').not().exists().isString().withMessage(TP_WEEKDAY_NOT_UPDATE).run(req)
  );

  validationPromises.push(
    body('task.*.week_from_sx').optional().isNumeric().withMessage(WEEK_FROM_SX_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('task.*.month_from_sx').optional().isNumeric().withMessage(MONTH_FROM_SX__NOT_NUMBER).run(req)
  );

  validationPromises.push(body('task.*.plyo_throw').optional().isNumeric().withMessage(PLYO_THROW_NOT_NUMBER).run(req));

  validationPromises.push(
    body('task.*.max_distance').optional().isNumeric().withMessage(MAX_DISTANCE_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('task.*.max_velocity_percent').optional().isNumeric().withMessage(MAX_VELOCITY_PERCENT_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('task.*.max_velocity_absolute').optional().isNumeric().withMessage(MAX_VELOCITY_ABSOLUTE_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('task.*.num_throws_at_max_distance').optional().isNumeric().withMessage(NUM_OF_THROWS_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('task.*.post_max_distance_flat_ground')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('task.*.post_max_distance_flat_ground_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_PERCENT_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('task.*.post_max_distance_flat_ground_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_ABSOLUTE_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('task.*.post_max_flat_ground_pitches')
      .optional()
      .isString()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_PITCHES_NOT_STRING)
      .run(req)
  );

  validationPromises.push(body('task.*.bullpen').optional().isNumeric().withMessage(BULLPEN_NOT_NUMBER).run(req));

  validationPromises.push(
    body('task.*.bullpen_max_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage(BULLPEN_MAX_VELOCITY_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('task.*.bullpen_max_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(BULLPEN_MAX_VELOCITY_ABSOLUTE_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('task.*.bullpen_pitches').optional().isString().withMessage(BULLPEN_PITCHES_NOT_STRING).run(req)
  );

  validationPromises.push(
    body('task.*.live_simulated_game').optional().isNumeric().withMessage(LIVE_SIMULATED_GAME_NOT_NUMBER).run(req)
  );

  validationPromises.push(body('task.*.innings').optional().isNumeric().withMessage(INNINGS_NOT_NUMBER).run(req));

  validationPromises.push(body('task.*.video_url').optional().isNumeric().withMessage(VIDEO_URL_NOT_STRING).run(req));

  await Promise.all(validationPromises);
  return validate(req, res, next);
}

export async function validateUserTaskCreate(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  validationPromises.push(body('tp_day').notEmpty().isNumeric().withMessage(TP_DAY_NOT_NUMBER).run(req));

  validationPromises.push(body('tasks.*.title').notEmpty().isString().withMessage(TITLE_STRING).run(req));

  validationPromises.push(body('tasks.*.is_completed').notEmpty().isBoolean().withMessage(IS_COMPLETED).run(req));

  validationPromises.push(body('tasks.*.is_skipped').notEmpty().isBoolean().withMessage(IS_SKIPPED).run(req));

  validationPromises.push(body('tasks.*.task_type').notEmpty().isNumeric().withMessage(TASK_TYPE_NUMBER).run(req));

  await Promise.all(validationPromises);
  return validate(req, res, next);
}
