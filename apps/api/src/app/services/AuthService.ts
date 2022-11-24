import { hash as hashPassword, compare as comparePassword } from 'bcrypt';
import { sign as signToken } from 'jsonwebtoken';

import { environment } from '../../config/config';
import { Questionnaire } from '../models/Questionnaire';
import { User } from '../models/User';
import { WebUser } from '../models/WebUser';
import { APIError } from '../utils/apiError';
import { INVALID_CREDENTIALS, USER_EXISTS, USER_NOT_FOUND, USER_NOT_VERIFIED } from '../utils/constants';

export async function createUser(email: string, password: string) {
  const doesUserExists = await User.findOne({ where: { email } });
  if (doesUserExists) throw new APIError(400, USER_EXISTS);

  // TODO - Salt round should be dynamic
  const encryptedPassword = await hashPassword(password, 10);

  const user = await User.create({ email, password: encryptedPassword });

  // Create token
  const token = signToken({ id: user.id }, environment.JWT_TOKEN_SECRET, { expiresIn: '2d' });

  return {
    user_id: user.id,
    email: user.email,
    token,
    is_terms_of_use_accepted: false,
    is_orientation_video_watched: false,
    is_questionnaire_submitted: false,
  };
}

export async function userLogin(email: string, password: string) {
  const user = await User.findOne({ where: { email }, include: [Questionnaire] });
  if (!user) throw new APIError(400, USER_NOT_FOUND);

  const pass_compare = await comparePassword(password, user.password);
  if (!pass_compare) throw new APIError(401, INVALID_CREDENTIALS);

  const token = signToken({ id: user.id }, environment.JWT_TOKEN_SECRET, { expiresIn: '2d' });

  return {
    user_id: user.id,
    email: user.email,
    token,
    is_terms_of_use_accepted: user.is_terms_of_use_accepted,
    is_orientation_video_watched: user.is_orientation_video_watched,
    is_questionnaire_submitted: user.questionnaires.length > 0,
  };
}

export async function createWebUser(email: string, password: string) {
  const doesUserExists = await WebUser.findOne({ where: { email } });
  if (doesUserExists) throw new APIError(400, USER_EXISTS);

  const encryptedPassword = await hashPassword(password, 10);

  const user = await WebUser.create({ email, password: encryptedPassword });

  // Create token
  const token = signToken({ id: user.id }, environment.JWT_TOKEN_SECRET, { expiresIn: '2d' });

  return {
    user_id: user.id,
    email: user.email,
    is_verified: false,
    token,
  };
}

export async function webUserLogin(email: string, password: string) {
  const user = await WebUser.findOne({ where: { email } });
  if (!user) throw new APIError(400, USER_NOT_FOUND);

  const pass_compare = await comparePassword(password, user.password);
  if (!pass_compare) throw new APIError(401, INVALID_CREDENTIALS);

  if (!user.is_verified) throw new APIError(401, USER_NOT_VERIFIED);

  const token = signToken({ id: user.id }, environment.JWT_TOKEN_SECRET, { expiresIn: '2d' });

  return {
    user_id: user.id,
    email: user.email,
    token,
  };
}
