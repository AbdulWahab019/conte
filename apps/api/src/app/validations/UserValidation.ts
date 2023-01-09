import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import { DATA_NOT_OBJECT, IS_COMPLETED, IS_SKIPPED, TASK_TYPE_NUMBER, TITLE_STRING } from '../utils/constants';
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

export async function validateUserTaskCreate(req: Request, res: Response, next: NextFunction) {
  const validationPromises = [];

  validationPromises.push(
    body('task.*.user_tp_id').optional().isNumeric().withMessage('User treatment plan id must be a number').run(req)
  );

  validationPromises.push(
    body('task.*.tp_day').optional().isNumeric().withMessage('Treatment plan day must be a number').run(req)
  );

  validationPromises.push(
    body('task.*.tp_weekday').optional().isString().withMessage('Treatment plan day must be a string').run(req)
  );

  validationPromises.push(
    body('task.*.week_from_sx').optional().isNumeric().withMessage('Week from surgery must be a number').run(req)
  );

  validationPromises.push(
    body('task.*.month_from_sx').optional().isNumeric().withMessage('Month from surgery must be a number').run(req)
  );

  validationPromises.push(
    body('task.*.plyo_throw').optional().isNumeric().withMessage('Plyo throw must be a number').run(req)
  );

  validationPromises.push(
    body('task.*.max_distance').optional().isNumeric().withMessage('Max distance must be a number').run(req)
  );

  validationPromises.push(
    body('task.*.max_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage('Max velocity percent must be a number')
      .run(req)
  );

  validationPromises.push(
    body('task.*.max_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage('Max velocity absolute must be a number')
      .run(req)
  );

  validationPromises.push(
    body('task.*.num_throws_at_max_distance')
      .optional()
      .isNumeric()
      .withMessage('Number of throws at max distance must be a number')
      .run(req)
  );

  validationPromises.push(
    body('task.*.post_max_distance_flat_ground')
      .optional()
      .isNumeric()
      .withMessage('Post max distance flat ground must be a number')
      .run(req)
  );

  validationPromises.push(
    body('task.*.post_max_distance_flat_ground_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage('Post max distance flat ground velocity percent must be a number')
      .run(req)
  );

  validationPromises.push(
    body('task.*.post_max_distance_flat_ground_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage('Post max distance flat ground velocity absolute must be a number')
      .run(req)
  );

  validationPromises.push(
    body('task.*.post_max_flat_ground_pitches')
      .optional()
      .isString()
      .withMessage('Post max flat ground pitches must be a string')
      .run(req)
  );

  validationPromises.push(
    body('task.*.bullpen').optional().isNumeric().withMessage('Bullpen must be a number').run(req)
  );

  validationPromises.push(
    body('task.*.bullpen_max_velocity_percent')
      .optional()
      .isNumeric()
      .withMessage('Bullpen max velocity percent must be a number')
      .run(req)
  );

  validationPromises.push(
    body('task.*.bullpen_max_velocity_absolute')
      .optional()
      .isNumeric()
      .withMessage('Bullpen max velocity absolute must be a number')
      .run(req)
  );

  validationPromises.push(
    body('task.*.bullpen_pitches').optional().isString().withMessage('Bullpen pitches must be a string').run(req)
  );

  validationPromises.push(
    body('task.*.live_simulated_game')
      .optional()
      .isNumeric()
      .withMessage('Live simulated game must be a number')
      .run(req)
  );

  validationPromises.push(
    body('task.*.innings').optional().isNumeric().withMessage('Innings must be a number').run(req)
  );

  validationPromises.push(
    body('task.*.video_url').optional().isNumeric().withMessage('Video url must be a string').run(req)
  );

  await Promise.all(validationPromises);
  return validate(req, res, next);
}
