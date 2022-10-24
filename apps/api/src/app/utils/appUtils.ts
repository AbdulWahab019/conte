import { Response } from 'express';

export function sendResponse(res: Response, code: number, message: string, data?: unknown, error = undefined) {
  return res.status(code).send({ code, message, data, error: error && error.message });
}
