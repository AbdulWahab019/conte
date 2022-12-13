import { User, UserModel, UserProfile } from '../models/User';
import { Op, Transaction } from 'sequelize';
import { APIError } from '../utils/apiError';
import { USER_NOT_FOUND } from '../utils/constants';
import { sequelize } from '../models';
import { UserTreatmentPlanDetail } from '../models/UserTreatmentPlanDetail';
import { UserTreatmentPlan } from '../models/UserTreatmentPlan';
import { UserTreatmentPlanTasks } from '../models/UserTreatmentPlanTasks';

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

async function getUsersData() {
  return await User.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM user_treatment_plan_tasks AS task WHERE task.is_skipped = 1 AND task.user_id = [User].id )`
          ),
          'num_skipped_tasks',
        ],
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM user_treatment_plan_tasks AS task WHERE task.is_completed = 1 AND task.user_id = [User].id )`
          ),
          'num_completed_tasks',
        ],
      ],
      exclude: ['createdAt', 'updatedAt', 'stripe_customer_id', 'stripe_subscription_id', 'password'],
    },
  });
}

async function getUserTPData(user_id: number) {
  return await UserTreatmentPlan.findOne({
    where: { user_id },
    include: [
      {
        model: UserTreatmentPlanDetail,
        as: 'details',
        attributes: ['tp_day', 'tp_weekday', 'video_url', 'created_at'],
        include: [
          {
            model: UserTreatmentPlanTasks,
            as: 'tasks',
            attributes: ['id', 'task_type', 'title', 'is_completed', 'is_skipped'],
            where: { user_id, tp_day: { [Op.col]: 'details.tp_day' } },
          },
        ],
      },
    ],
  });
}

async function updateTaskWeb(user_id: number, task_id: number, data: any) {
  return await UserTreatmentPlanTasks.update({ ...data }, { where: { user_id, id: task_id } });
}

export { isTermsOfUseAccepted, isOrientationVideoWatched, getUsersData, getUserTPData, updateTaskWeb };
