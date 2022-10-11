import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { APIError } from '../utils/apiError';
import { INVALID_CREDENTIALS, USER_EXISTS, USER_NOT_FOUND } from '../utils/constants';

async function createUser(email: string, password: string) {
  const doesUserExists = await User.findOne({ where: { email } });
  if (doesUserExists) throw new APIError(400, USER_EXISTS);

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = (await User.create({ email, password: encryptedPassword })).toJSON();

  // Create token
  const token = jwt.sign({ id: user.id }, environment.JWT_TOKEN_SECRET, { expiresIn: '2d' });

  return {
    user_id: user.id,
    email: user.email,
    token,
    is_terms_of_use_accepted: false,
    is_orientation_video_watched: false,
  };
}

async function loginUser(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new APIError(400, USER_NOT_FOUND);

  const pass_compare = await bcrypt.compare(password, user.password);
  if (!pass_compare) throw new APIError(401, INVALID_CREDENTIALS);

  const token = jwt.sign({ user_ids: user.id }, environment.JWT_TOKEN_SECRET, { expiresIn: '2d' });

  return {
    user_id: user.id,
    email: user.email,
    token,
    is_terms_of_use_accepted: user.is_terms_of_use_accepted,
    is_orientation_video_watched: user.is_orientation_video_watched,
  };
}

async function isTermsOfUseAccepted(user_id: number, isAccepted = true) {
  const user = await User.findOne({ where: { id: user_id } });
  if (!user) throw new APIError(400, USER_NOT_FOUND);

  user.is_terms_of_use_accepted = isAccepted;
  await user.save();

  return true;
}

async function isOrientationVideoWatched(user_id: number, hasWatched = true) {
  const user = await User.findOne({ where: { id: user_id } });
  if (!user) throw new APIError(400, USER_NOT_FOUND);

  user.is_orientation_video_watched = hasWatched;
  await user.save();

  return true;
}

export { createUser, loginUser, isTermsOfUseAccepted, isOrientationVideoWatched };
