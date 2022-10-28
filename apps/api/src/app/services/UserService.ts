import { User, UserModel, UserProfile } from '../models/User';
import { Transaction } from 'sequelize';
import { APIError } from '../utils/apiError';
import { USER_NOT_FOUND } from '../utils/constants';

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

export async function updateUser(
  user: UserModel,
  data: UserProfile,
  { transaction = undefined }: { transaction?: Transaction } = {}
) {
  if (data.email) user.email = data.email;
  if (data.first_name) user.first_name = data.first_name;
  if (data.last_name) user.last_name = data.last_name;
  if (data.cell_phone) user.cell_phone = data.cell_phone;
  if (data.birth_date) user.birth_date = data.birth_date;
  if (data.address) user.address = data.address;
  if (data.city) user.city = data.city;
  if (data.state) user.state = data.state;
  if (data.zip_code) user.zip_code = data.zip_code;
  if (data.estimated_max_velocity) user.estimated_max_velocity = data.estimated_max_velocity;

  await user.save({ transaction });
  return user;
}

export { isTermsOfUseAccepted, isOrientationVideoWatched };
