import { parse } from 'csv-parse';
import { sequelize } from '../models';
import { TreatmentPlan } from '../models/TreatmentPlan';
import { TreatmentPlanDetail, TreatmentPlanDetailsFileAttributes } from '../models/TreatmentPlanDetail';
import { APIError } from '../utils/apiError';
import { INTERNAL_SERVER_ERROR } from '../utils/constants';
import { transformToTreatmentPlanDetails } from '../utils/dataMapping';

export async function createTreatmentPlan(
  name: string,
  doctor_id: number,
  surgery_id: number,
  treatmentPlanDetails: TreatmentPlanDetailsFileAttributes[]
) {
  const transaction = await sequelize.transaction();
  try {
    const treatmentPlan = await TreatmentPlan.create({ name, doctor_id, surgery_id }, { transaction });

    treatmentPlanDetails = treatmentPlanDetails.map((detail) => ({ ...detail, tp_id: treatmentPlan.id }));

    await TreatmentPlanDetail.bulkCreate(treatmentPlanDetails, { transaction });

    await transaction.commit();
    return treatmentPlan;
  } catch (err) {
    await transaction.rollback();
    throw new APIError(500, INTERNAL_SERVER_ERROR, err);
  }
}

export async function parseTreatmentPlanFile(
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
