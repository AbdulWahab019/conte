import { NextFunction, Request, Response } from 'express';
import { APIError } from '../utils/apiError';
import { sendResponse } from '../utils/appUtils';
import { INTERNAL_SERVER_ERROR } from '../utils/constants';

export async function error(err: Error | APIError, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Error) {
    const apiError = new APIError(500, INTERNAL_SERVER_ERROR, err);
    sendResponse(res, apiError.code, apiError.message, undefined, apiError.error);
  } else {
    sendResponse(res, err.code, err.message, undefined, err.error);
  }
}
