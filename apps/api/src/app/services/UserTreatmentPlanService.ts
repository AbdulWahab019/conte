import moment = require('moment');
import { Transaction } from 'sequelize';

import { TreatmentPlanModel } from '../models/TreatmentPlan';
import { UserTreatmentPlan } from '../models/UserTreatmentPlan';
import { UserTreatmentPlanDetail, UserTreatmentPlanDetailDefinedAttributes } from '../models/UserTreatmentPlanDetail';
import { UserTreatmentPlanTasks } from '../models/UserTreatmentPlanTasks';
import { getTasksFromTPDay } from '../helpers/TreatmentPlanHelper';
import { APIError } from '../utils/apiError';
import { TREATMENT_PLAN_NOT_ASSIGNED } from '../utils/constants';

export async function createUserTreatmentPlan(
  user_id: number,
  user_estimated_max_velocity: number,
  treatment_plan: TreatmentPlanModel,
  name: string,
  { transaction = undefined }: { transaction?: Transaction } = {}
) {
  // Create User Treatment Plan
  const userTreatmentPlan = await UserTreatmentPlan.create(
    { name, user_id, tp_id: treatment_plan.id },
    { transaction }
  );

  const userTreatmentPlanDetailsData = treatment_plan.TreatmentPlanDetails.map((detail) => ({
    user_tp_id: userTreatmentPlan.id,
    ...detail,
    max_velocity_absolute: user_estimated_max_velocity * (detail.max_velocity_percent / 100),
    post_max_distance_flat_ground_velocity_absolute:
      user_estimated_max_velocity * (detail.post_max_distance_flat_ground_velocity_percent / 100),
    bullpen_max_velocity_absolute: user_estimated_max_velocity * (detail.bullpen_max_velocity_percent / 100),
  }));

  const tasks = userTreatmentPlanDetailsData.flatMap((user_tp_detail: UserTreatmentPlanDetailDefinedAttributes) => {
    const tasks = getTasksFromTPDay(user_tp_detail);

    // console.log(tasks);
    return tasks.map((task) => ({
      user_id,
      user_tp_id: userTreatmentPlan.id,
      tp_day: user_tp_detail.tp_day,
      title: task,
    }));
  });

  // Create User Treatment Plan Details
  await Promise.all([
    await UserTreatmentPlanDetail.bulkCreate(userTreatmentPlanDetailsData, { transaction }),
    await UserTreatmentPlanTasks.bulkCreate(tasks, { transaction }),
  ]);

  return userTreatmentPlan;
}

export async function getUserTasksByDate(user_id: number, date: string) {
  const treatmentPlan = await UserTreatmentPlan.findOne({ where: { user_id }, attributes: ['createdAt'] });
  if (!treatmentPlan) return new APIError(400, TREATMENT_PLAN_NOT_ASSIGNED);

  const formattedDate = moment(date).format('YYYY-MM-DD');
  const formattedTpDate = moment(treatmentPlan.createdAt).format('YYYY-MM-DD');

  const tp_day = moment(formattedDate).diff(moment(formattedTpDate), 'days') + 1;
  return await UserTreatmentPlanTasks.findAll({ where: { user_id, tp_day } });
}

export async function updateUserTask(task_id: number, status: boolean, user_id: number) {
  return await UserTreatmentPlanTasks.update({ is_completed: status }, { where: { id: task_id, user_id } });
}
