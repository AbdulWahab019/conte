import { Transaction } from 'sequelize';
import { TreatmentPlanModel } from '../models/TreatmentPlan';

import { UserTreatmentPlan } from '../models/UserTreatmentPlan';
import { UserTreatmentPlanDetail } from '../models/UserTreatmentPlanDetail';

export async function createUserTreatmentPlan(
  user_id: number,
  treatment_plan: TreatmentPlanModel,
  name: string,
  { transaction }: { transaction: Transaction }
) {
  // Create User Treatment Plan
  const userTreatmentPlan = await UserTreatmentPlan.create(
    { name, user_id, tp_id: treatment_plan.id },
    { transaction }
  );

  const userTreatmentPlanDetailsData = treatment_plan.TreatmentPlanDetails.map((detail) => ({
    user_tp_id: userTreatmentPlan.id,
    ...detail,
  }));

  // Create User Treatment Plan Details
  await UserTreatmentPlanDetail.bulkCreate(userTreatmentPlanDetailsData, { transaction });

  return userTreatmentPlan;
}
