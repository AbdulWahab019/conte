import { Request, Response } from 'express';
import { TreatmentPlanDetailsFileAttributes } from '../models/TreatmentPlanDetail';
import { createTreatmentPlan, parseTreatmentPlanFile } from '../services/TreatmentPlanService';

import { sendResponse } from '../utils/appUtils';
import { SUCCESS } from '../utils/constants';

export async function uploadTreatmentPlan(req: Request, res: Response) {
  const file: Express.Multer.File = req.file;
  const { read_from_line, name, doctor_id, surgery_id } = req.body;

  // Parse the file
  const treatmentPlanDetails: TreatmentPlanDetailsFileAttributes[] = await parseTreatmentPlanFile(file, read_from_line);

  // Save in DB
  const treatmentPlan = await createTreatmentPlan(name, doctor_id, surgery_id, treatmentPlanDetails);

  return sendResponse(res, 200, SUCCESS, treatmentPlan);
}
