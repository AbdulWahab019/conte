import { Request, Response } from 'express';
import { sequelize } from '../models';
import {
  createTreatmentPlan,
  getUserTaskFeedback,
  parseTreatmentPlanFile,
  createUserTaskFeedBack,
} from '../services/TreatmentPlanService';
import { APIError } from '../utils/apiError';
import { sendResponse } from '../utils/appUtils';
import { INTERNAL_SERVER_ERROR, SUCCESS } from '../utils/constants';
import { updateUserTask, getUserTasksByDate } from '../services/UserTreatmentPlanService';
import { UploadTreatmentPlanAPIReq } from '@conte/models';

export async function uploadTreatmentPlan(req: Request, res: Response) {
  const file: Express.Multer.File = req.file;
  const { read_from_line, read_to_line, name, doctor_id, surgery_id }: UploadTreatmentPlanAPIReq = req.body;

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

export async function getTasksByDate(req: Request, res: Response) {
  const { id: user_id } = req['user'];
  const { date } = req.params;

  const tasks = await getUserTasksByDate(user_id, date);
  return sendResponse(res, 200, SUCCESS, tasks);
}

export async function updateTask(req: Request, res: Response) {
  const { id: user_id } = req['user'];
  const { task_id, status } = req.params;

  await updateUserTask(Number(task_id), JSON.parse(status), user_id);
  return sendResponse(res, 200, SUCCESS);
}

export async function postTaskFeedback(req: Request, res: Response) {
  const { data } = req.body;

  const apiResp = await createUserTaskFeedBack(data);

  return sendResponse(res, 200, SUCCESS, apiResp);
}

export async function getTaskeedback(req: Request, res: Response) {
  const { task_id } = req.params;

  const apiResp = await getUserTaskFeedback(Number(task_id));

  return sendResponse(res, 200, SUCCESS, apiResp);
}
