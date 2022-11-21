import { parse } from 'csv-parse';
import { Attributes, FindOptions, Transaction, where } from 'sequelize';

import { TreatmentPlan } from '../models/TreatmentPlan';
import {
  TreatmentPlanDetail,
  TreatmentPlanDetailModel,
  TreatmentPlanDetailsFileAttributes,
} from '../models/TreatmentPlanDetail';

import { transformToTreatmentPlanDetails } from '../helpers/TreatmentPlanHelper';
import { UserTreatmentPlanTaskFeedback } from '../models/UserTreatmentPlanTaskFeedback';
import { FeedbackRequest } from '@conte/models';
import { UserTreatmentPlanTasks } from '../models/UserTreatmentPlanTasks';

export async function createTreatmentPlan(
  name: string,
  doctor_id: number,
  surgery_id: number,
  treatmentPlanFileDetails: TreatmentPlanDetailsFileAttributes[],
  { transaction }: { transaction?: Transaction }
) {
  const treatmentPlan = await TreatmentPlan.create({ name, doctor_id, surgery_id }, { transaction });

  const treatmentPlanDetails = treatmentPlanFileDetails.map((detail) => ({ ...detail, tp_id: treatmentPlan.id }));
  await TreatmentPlanDetail.bulkCreate(treatmentPlanDetails, { transaction });

  return treatmentPlan;
}

export async function getTreatmentPlanByDoctorAndSurgery(doctor_id: number, surgery_id?: number) {
  const where = Object.assign({}, { doctor_id }, surgery_id ? { surgery_id } : {});
  return await TreatmentPlan.findOne({
    where,
    attributes: { exclude: ['created_at', 'updated_at'] },
    include: TreatmentPlanDetail,
  });
}

export async function getTreatmentPlanDetails(params: FindOptions<Attributes<TreatmentPlanDetailModel>>) {
  return await TreatmentPlanDetail.findAll(params);
}

export function parseTreatmentPlanFile(
  file: Express.Multer.File,
  from = 2,
  to: number
): Promise<TreatmentPlanDetailsFileAttributes[]> {
  return new Promise((resolve, reject) => {
    parse(file.buffer, { from, to, relaxQuotes: true, onRecord: transformToTreatmentPlanDetails }, (err, records) => {
      if (err) reject(err);

      resolve(records);
    });
  });
}

export async function createUserTaskFeedBack(data: FeedbackRequest[]) {
  return await UserTreatmentPlanTaskFeedback.bulkCreate(data);
}

export async function getUserTaskFeedback(task_id: number) {
  return await UserTreatmentPlanTaskFeedback.findAll({ attributes: ['id', 'feedback', 'type'], where: { task_id } });
}

export async function updateUserSkippedTasks(user_id: number, tp_day: number) {
  return await UserTreatmentPlanTasks.update({ is_skipped: true }, { where: { user_id, tp_day } });
}
