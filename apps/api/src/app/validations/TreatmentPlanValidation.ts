import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import * as constants from '../utils/constants';
import { validate } from './validation';

export async function validateTreatmentPlanData(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  validationPromises.push(body('data').isObject().withMessage(constants.DATA_NOT_OBJECT).run(req));

  validationPromises.push(body('data.tp_id').not().exists().withMessage(constants.TP_ID_NOT_UPDATE).run(req));

  validationPromises.push(body('data.tp_day').not().exists().withMessage(constants.TP_DAY_NOT_UPDATE).run(req));

  validationPromises.push(body('data.tp_weekday').not().exists().withMessage(constants.TP_WEEKDAY_NOT_UPDATE).run(req));

  validationPromises.push(
    body('data.week_from_sx').optional().isNumeric().withMessage(constants.WEEK_FROM_SX_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.month_from_sx').optional().isNumeric().withMessage(constants.MONTH_FROM_SX__NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.week_of_throwing').optional().isNumeric().withMessage(constants.WEEK_OF_THROWING_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.month_of_throwing').optional().isNumeric().withMessage(constants.MONTH_OF_THROWING_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.plyo_throw').optional().isNumeric().withMessage(constants.PLYO_THROW_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.max_distance').optional().isNumeric().withMessage(constants.MAX_DISTANCE_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.max_velocity_percent').optional().isNumeric().withMessage(constants.MAX_VELOCITY_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.max_velocity_absolute').optional().isNumeric().withMessage(constants.MAX_VELOCITY_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.num_throws_at_max_distance')
      .optional()
      .isNumeric()
      .withMessage(constants.POST_MAX_DISTANCE_FLAT_GROUND_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_distance_flat_ground')
      .optional()
      .isNumeric()
      .withMessage(constants.POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_distance_flat_ground_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage(constants.POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_distance_flat_ground_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(constants.POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_ABSOLUTE_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.post_max_flat_ground_pitches')
      .optional()
      .isString()
      .withMessage(constants.POST_MAX_DISTANCE_FLAT_GROUND_PITCHES_NOT_STRING)
      .run(req)
  );

  validationPromises.push(
    body('data.bullpen').optional().isNumeric().withMessage(constants.BULLPEN_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.bullpen_max_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage(constants.BULLPEN_MAX_VELOCITY_ABSOLUTE_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.bullpen_max_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage(constants.BULLPEN_MAX_VELOCITY_ABSOLUTE_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.bullpen_pitches').optional().isString().withMessage(constants.BULLPEN_PITCHES_NOT_STRING).run(req)
  );

  validationPromises.push(
    body('data.live_simulated_game')
      .optional()
      .isNumeric()
      .withMessage(constants.LIVE_SIMULATED_GAME_NOT_NUMBER)
      .run(req)
  );

  validationPromises.push(
    body('data.innings').optional().isNumeric().withMessage(constants.INNINGS_NOT_NUMBER).run(req)
  );

  validationPromises.push(
    body('data.video_url').optional().isString().withMessage(constants.VIDEO_URL_NOT_STRING).run(req)
  );

  await Promise.all(validationPromises);
  return validate(req, res, next);
}
