import { Response } from 'express';

function sendResponse(res: Response, code: number, message: string, data?: Extra, error = undefined) {
  return res.status(code).send({ code, message, data, error: error && (error.message ? error.message : error) });
}

type Extra = {
  [key: string]: unknown;
};

export { sendResponse };
