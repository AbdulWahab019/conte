import { Request, Response } from 'express';
import { sequelize } from '../models';
import {
  createTreatmentPlan,
  getUserTaskFeedback,
  parseTreatmentPlanFile,
  createUserTaskFeedBack,
  skipTPDayTasks,
} from '../services/TreatmentPlanService';
import { APIError } from '../utils/apiError';
import { sendResponse } from '../utils/appUtils';
import { INTERNAL_SERVER_ERROR, SUCCESS, TREATMENT_PLAN_NOT_ASSIGNED } from '../utils/constants';
import { updateUserTask, getUserTasksByDate } from '../services/UserTreatmentPlanService';
import { UploadTreatmentPlanAPIReq } from '@conte/models';
import { getUserTreatmentPlanDayByDate } from '../helpers/TreatmentPlanHelper';
import { UserTreatmentPlan } from '../models/UserTreatmentPlan';

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
  const { comment = '' } = req.body;

  await updateUserTask(Number(task_id), JSON.parse(status), user_id, comment);
  return sendResponse(res, 200, SUCCESS);
}

export async function postTaskFeedback(req: Request, res: Response) {
  const { data } = req.body;

  const apiResp = await createUserTaskFeedBack(data);

  return sendResponse(res, 200, SUCCESS, apiResp);
}

export async function getTaskFeedback(req: Request, res: Response) {
  const { task_id } = req.params;

  const apiResp = await getUserTaskFeedback(Number(task_id));

  return sendResponse(res, 200, SUCCESS, apiResp);
}

export async function skipUserTasks(req: Request, res: Response) {
  const { id: user_id } = req['user'];

  const { date } = req.params;

  const treatmentPlan = await UserTreatmentPlan.findOne({ where: { user_id }, attributes: ['assigned_at'] });
  if (!treatmentPlan) return new APIError(400, TREATMENT_PLAN_NOT_ASSIGNED);

  const { tp_day } = getUserTreatmentPlanDayByDate(date, treatmentPlan.assigned_at);

  await skipTPDayTasks(user_id, tp_day);

  return sendResponse(res, 200, SUCCESS);
}
