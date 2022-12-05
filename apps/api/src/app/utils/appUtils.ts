import { Response } from 'express';
import { captureException } from '@sentry/node';

export function sendResponse(res: Response, code: number, message: string, data?: unknown, error = undefined) {
  if (error) captureException(error);

  return res.status(code).send({ code, message, data, error: error && error.message });
}
