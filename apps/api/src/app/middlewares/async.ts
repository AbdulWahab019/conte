import { Request, Response, NextFunction } from 'express';

module.exports = function (handler: (req: Request, res: Response) => Promise<void>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
