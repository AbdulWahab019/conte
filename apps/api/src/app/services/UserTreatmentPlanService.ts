import { Transaction } from 'sequelize';
import { TreatmentPlanModel } from '../models/TreatmentPlan';

import { UserTreatmentPlan } from '../models/UserTreatmentPlan';
import { UserTreatmentPlanDetail } from '../models/UserTreatmentPlanDetail';

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

  // Create User Treatment Plan Details
  await UserTreatmentPlanDetail.bulkCreate(userTreatmentPlanDetailsData, { transaction });

  return userTreatmentPlan;
}
