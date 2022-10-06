import { sendResponse } from '../utils/appUtils';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendResponse(res, 400, 'Bad Request', undefined, errors.array());

  next();
};

export { validateRequest as validate };
