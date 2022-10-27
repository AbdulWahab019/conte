import { Transaction } from 'sequelize';
import { TreatmentPlanModel } from '../models/TreatmentPlan';

import { UserTreatmentPlan } from '../models/UserTreatmentPlan';
import { UserTreatmentPlanDetail, UserTreatmentPlanDetailDefinedAttributes } from '../models/UserTreatmentPlanDetail';
import { getTasksFromTPDay } from '../utils/dataMapping';

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

    return tasks.map((task) => ({
      user_id,
      user_tp_id: userTreatmentPlan.id,
      tp_day: user_tp_detail.tp_day,
      title: task,
    }));
  });

  // Create User Treatment Plan Details
  // await Promise.all([
  await UserTreatmentPlanDetail.bulkCreate(userTreatmentPlanDetailsData, { transaction });
  // UserTreatmentPlanTask.bulkCreate(tasks, { transaction }),
  // ]);

  return userTreatmentPlan;
}
