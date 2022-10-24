import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { sendResponse } from '../utils/appUtils';
import { BAD_REQUEST } from '../utils/constants';

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return sendResponse(res, 400, BAD_REQUEST, undefined, new Error(errors.array()[0].msg));

  next();
}
