import { parse } from 'csv-parse';
import { Attributes, FindOptions, Transaction } from 'sequelize';

import { TreatmentPlan } from '../models/TreatmentPlan';
import {
  TreatmentPlanDetail,
  TreatmentPlanDetailModel,
  TreatmentPlanDetailsFileAttributes,
} from '../models/TreatmentPlanDetail';

import { transformToTreatmentPlanDetails } from '../utils/dataMapping';

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
  from = 2
): Promise<TreatmentPlanDetailsFileAttributes[]> {
  return new Promise((resolve, reject) => {
    parse(file.buffer, { from, relaxQuotes: true, onRecord: transformToTreatmentPlanDetails }, (err, records) => {
      if (err) reject(err);

      resolve(records);
    });
  });
}