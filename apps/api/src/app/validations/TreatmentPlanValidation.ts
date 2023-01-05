import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import {
  BULLPEN_MAX_VELOCITY_ABSOLUTE_NOT_NUMBER,
  BULLPEN_MAX_VELOCITY_NOT_NUMBER,
  BULLPEN_NOT_NUMBER,
  BULLPEN_PITCHES_NOT_STRING,
  DATA_NOT_OBJECT,
  DOCTOR_ID_NOT_NUMBER,
  INNINGS_NOT_NUMBER,
  LIVE_SIMULATED_GAME_NOT_NUMBER,
  MAX_DISTANCE_NOT_NUMBER,
  MAX_VELOCITY_ABSOLUTE_NOT_NUMBER,
  MAX_VELOCITY_PERCENT_NOT_NUMBER,
  MONTH_FROM_SX__NOT_NUMBER,
  MONTH_OF_THROWING_NOT_NUMBER,
  NAME_NOT_STRING,
  NUM_OF_THROWS_NOT_NUMBER,
  PLYO_THROW_NOT_NUMBER,
  POST_MAX_DISTANCE_FLAT_GROUND_NOT_NUMBER,
  POST_MAX_DISTANCE_FLAT_GROUND_PITCHES_NOT_STRING,
  POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_ABSOLUTE_NOT_NUMBER,
  POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_PERCENT_NOT_NUMBER,
  SURGERY_ID_NOT_NUMBER,
  TP_DAY_NOT_NUMBER,
  TP_DAY_NOT_UPDATE,
  TP_ID_NOT_UPDATE,
  TP_WEEKDAY_NOT_STRING,
  TP_WEEKDAY_NOT_UPDATE,
  VIDEO_URL_NOT_STRING,
  WEEK_FROM_SX_NOT_NUMBER,
  WEEK_OF_THROWING_NOT_NUMBER,
} from '../utils/constants';
import { validate } from './validation';

export async function validateTreatmentPlanData(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  validationPromises.push(body('data').isObject().withMessage(DATA_NOT_OBJECT).run(req));

  validationPromises.push(body('data.tp_id').not().exists().withMessage(TP_ID_NOT_UPDATE).run(req));

  validationPromises.push(body('data.tp_day').not().exists().withMessage(TP_DAY_NOT_UPDATE).run(req));

  validationPromises.push(body('data.tp_weekday').not().exists().withMessage(TP_WEEKDAY_NOT_UPDATE).run(req));

  validationPromises.push(
    body('data.week_from_sx').optional().isNumeric().withMessage(WEEK_FROM_SX_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.month_from_sx').optional().isNumeric().withMessage(MONTH_FROM_SX__NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.week_of_throwing').optional().isNumeric().withMessage(WEEK_OF_THROWING_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.month_of_throwing').optional().isNumeric().withMessage(MONTH_OF_THROWING_NOT_NUMBER).run(req)
  );

  validationPromises.push(body('data.plyo_throw').optional().isNumeric().withMessage(PLYO_THROW_NOT_NUMBER).run(req));

  validationPromises.push(
    body('data.max_distance').optional().isNumeric().withMessage(MAX_DISTANCE_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.max_velocity_percent').optional().isNumeric().withMessage(MAX_VELOCITY_PERCENT_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.max_velocity_absolute').optional().isNumeric().withMessage(MAX_VELOCITY_ABSOLUTE_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.num_throws_at_max_distance').optional().isNumeric().withMessage(NUM_OF_THROWS_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.post_max_distance_flat_ground')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_distance_flat_ground_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_PERCENT_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_distance_flat_ground_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_ABSOLUTE_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_flat_ground_pitches')
      .optional()
      .isString()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_PITCHES_NOT_STRING)
      .run(req)
  );

  validationPromises.push(body('data.bullpen').optional().isNumeric().withMessage(BULLPEN_NOT_NUMBER).run(req));

  validationPromises.push(
    body('data.bullpen_max_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage(BULLPEN_MAX_VELOCITY_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.bullpen_max_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(BULLPEN_MAX_VELOCITY_ABSOLUTE_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.bullpen_pitches').optional().isString().withMessage(BULLPEN_PITCHES_NOT_STRING).run(req)
  );

  validationPromises.push(
    body('data.live_simulated_game').optional().isNumeric().withMessage(LIVE_SIMULATED_GAME_NOT_NUMBER).run(req)
  );

  validationPromises.push(body('data.innings').optional().isNumeric().withMessage(INNINGS_NOT_NUMBER).run(req));

  validationPromises.push(body('data.video_url').optional().isString().withMessage(VIDEO_URL_NOT_STRING).run(req));

  await Promise.all(validationPromises);
  return validate(req, res, next);
}

export async function validateTreatmentPlanDataWeb(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  validationPromises.push(body('name').notEmpty().isString().withMessage(NAME_NOT_STRING).run(req));

  validationPromises.push(body('doctor_id').notEmpty().isNumeric().withMessage(DOCTOR_ID_NOT_NUMBER).run(req));

  validationPromises.push(body('surgery_id').optional().isNumeric().withMessage(SURGERY_ID_NOT_NUMBER).run(req));

  validationPromises.push(
    body('week_from_surgery').notEmpty().isNumeric().withMessage(WEEK_FROM_SX_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('month_from_surgery').notEmpty().isNumeric().withMessage(MONTH_FROM_SX__NOT_NUMBER).run(req)
  );

  validationPromises.push(body('details.*.tp_day').optional().isNumeric().withMessage(TP_DAY_NOT_NUMBER).run(req));

  validationPromises.push(
    body('details.*.tp_weekday').optional().isString().withMessage(TP_WEEKDAY_NOT_STRING).run(req)
  );

  validationPromises.push(
    body('details.*.week_from_sx').optional().isNumeric().withMessage(WEEK_FROM_SX_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('details.*.month_from_sx').optional().isNumeric().withMessage(MONTH_FROM_SX__NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('details.*.week_of_throwing').optional().isNumeric().withMessage(WEEK_OF_THROWING_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('details.*.month_of_throwing').optional().isNumeric().withMessage(MONTH_OF_THROWING_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('details.*.plyo_throw').optional().isNumeric().withMessage(PLYO_THROW_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('details.*.max_distance').optional().isNumeric().withMessage(MAX_DISTANCE_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('details.*.max_velocity_percent').optional().isNumeric().withMessage(MAX_VELOCITY_PERCENT_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('details.*.max_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(MAX_VELOCITY_ABSOLUTE_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('details.*.num_throws_at_max_distance').optional().isNumeric().withMessage(NUM_OF_THROWS_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('details.*.post_max_distance_flat_ground')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('details.*.post_max_distance_flat_ground_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_PERCENT_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('details.*.post_max_distance_flat_ground_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_ABSOLUTE_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('details.*.post_max_flat_ground_pitches')
      .optional()
      .isString()
      .withMessage(POST_MAX_DISTANCE_FLAT_GROUND_PITCHES_NOT_STRING)
      .run(req)
  );

  validationPromises.push(body('details.*.bullpen').optional().isNumeric().withMessage(BULLPEN_NOT_NUMBER).run(req));

  validationPromises.push(
    body('details.*.bullpen_max_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage(BULLPEN_MAX_VELOCITY_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('details.*.bullpen_max_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(BULLPEN_MAX_VELOCITY_ABSOLUTE_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('details.*.bullpen_pitches').optional().isString().withMessage(BULLPEN_PITCHES_NOT_STRING).run(req)
  );

  validationPromises.push(
    body('details.*.live_simulated_game').optional().isNumeric().withMessage(LIVE_SIMULATED_GAME_NOT_NUMBER).run(req)
  );

  validationPromises.push(body('details.*.innings').optional().isNumeric().withMessage(INNINGS_NOT_NUMBER).run(req));

  validationPromises.push(body('details.*.video_url').optional().isString().withMessage(VIDEO_URL_NOT_STRING).run(req));

  await Promise.all(validationPromises);
  return validate(req, res, next);
}
