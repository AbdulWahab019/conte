import { NextFunction, Request, Response } from 'express';
import { verify as verifyToken } from 'jsonwebtoken';
import { environment } from '../../config/config';

import { User } from '../models/User';
import { WebUser } from '../models/WebUser';
import { sendResponse } from '../utils/appUtils';
import { AUTHENTICATION_FAILED, UNAUTHORIZED } from '../utils/constants';

export async function authorize(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenHeader = req.header('Authorization');
    if (!tokenHeader) return sendResponse(res, 401, UNAUTHORIZED);

    const token = tokenHeader.replace('Bearer ', '').replace('bearer ', '');
    const decoded = verifyToken(token, environment.JWT_TOKEN_SECRET);

    const user = await User.findOne({
      where: { id: decoded.id },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    if (!user) return sendResponse(res, 401, UNAUTHORIZED);

    req['token'] = token;
    req['user'] = user;

    return next();
  } catch (error) {
    return sendResponse(res, 401, AUTHENTICATION_FAILED, undefined, error);
  }
}

export async function authorizeWebUser(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenHeader = req.header('Authorization');
    if (!tokenHeader) return sendResponse(res, 401, UNAUTHORIZED);

    const token = tokenHeader.replace('Bearer ', '').replace('bearer ', '');
    const decoded = verifyToken(token, environment.JWT_TOKEN_SECRET);

    const user = await WebUser.findOne({
      where: { id: decoded.id },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    if (!user) return sendResponse(res, 401, UNAUTHORIZED);

    req['token'] = token;
    req['user'] = user;

    return next();
  } catch (error) {
    return sendResponse(res, 401, AUTHENTICATION_FAILED, undefined, error);
  }
}
