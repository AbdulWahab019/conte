import { Request, Response } from 'express';

import { sequelize } from '../models';
import { createTreatmentPlan, parseTreatmentPlanFile } from '../services/TreatmentPlanService';
import { APIError } from '../utils/apiError';
import { sendResponse } from '../utils/appUtils';
import { INTERNAL_SERVER_ERROR, SUCCESS } from '../utils/constants';

export async function uploadTreatmentPlan(req: Request, res: Response) {
  const file: Express.Multer.File = req.file;
  const { read_from_line, read_to_line, name, doctor_id, surgery_id } = req.body;

  // Parse the file
  const treatmentPlanDetails = await parseTreatmentPlanFile(file, read_from_line, read_to_line);

  const transaction = await sequelize.transaction();
  try {
    // Save in DB
    const treatmentPlan = await createTreatmentPlan(name, doctor_id, surgery_id, treatmentPlanDetails, { transaction });

    transaction.commit();
    return sendResponse(res, 200, SUCCESS, treatmentPlan);
  } catch (err) {
    await transaction.rollback();
    throw new APIError(500, INTERNAL_SERVER_ERROR, err);
  }
}
