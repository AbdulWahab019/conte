import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';

import { validate } from './validation';

export async function validateSurgeriesByDoctor(req: Request, res: Response, next: NextFunction) {
  await param('doctor_id').isInt().run(req);

  return validate(req, res, next);
}
