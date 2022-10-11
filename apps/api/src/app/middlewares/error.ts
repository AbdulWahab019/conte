import { NextFunction, Request, Response } from 'express';
import { APIError } from '../utils/apiError';
import { sendResponse } from '../utils/appUtils';

async function error(err: APIError, req: Request, res: Response, next: NextFunction) {
  sendResponse(res, err.code, err.message, undefined, err.error);
}

export { error };
