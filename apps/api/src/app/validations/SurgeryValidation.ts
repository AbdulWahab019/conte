import { NextFunction, Request, Response } from 'express';
import { param, Meta } from 'express-validator';

import { validate } from './validation';

export async function validateDoctor(req: Request, res: Response, next: NextFunction) {
  // Doctor ID validation
  await param('doctor_id').isString().toInt().run(req);

  return await validate(req, res, next);
}
