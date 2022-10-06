import { sendResponse } from '../utils/appUtils';
import { validationResult } from 'express-validator';

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return sendResponse(
      res,
      400,
      'Bad Request',
      undefined,
      errors.array()
      // false
    );

  next();
};

// const validateRequest = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return utils.sendResponse(res, 400, "Bad Request", undefined, errors.array(), false);

//   next();
// };

export { validateRequest as validate };
