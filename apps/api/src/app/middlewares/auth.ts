import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { environment } from '../../config/config';

import { User } from '../models/User';
import { sendResponse } from '../utils/appUtils';
import { AUTHENTICATION_FAILED, UNAUTHORIZED } from '../utils/constants';

export async function authorize(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenHeader = req.header('Authorization');
    if (!tokenHeader) return sendResponse(res, 401, UNAUTHORIZED);

    const token = tokenHeader.replace('Bearer ', '').replace('bearer ', '');
    const decoded = jwt.verify(token, environment.JWT_TOKEN_SECRET);

    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) return sendResponse(res, 401, UNAUTHORIZED);

    req['token'] = token;
    req['user'] = user;

    next();
  } catch (error) {
    sendResponse(res, 403, AUTHENTICATION_FAILED, undefined, error);
  }
}
