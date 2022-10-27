import { Request, Response } from 'express';
import { sequelize } from '../models';
import { UserTreatmentPlanTasks } from '../models/UserTreatmentPlanTasks';
import { createTreatmentPlan, parseTreatmentPlanFile } from '../services/TreatmentPlanService';
import { APIError } from '../utils/apiError';
import { sendResponse } from '../utils/appUtils';
import * as moment from 'moment';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, SUCCESS } from '../utils/constants';
import { UserTreatmentPlan } from '../models/UserTreatmentPlan';
import { getTasksFromTPDay } from '../utils/dataMapping';

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

export async function getTaskByDate(req: Request, res: Response) {
  try {
    const { id } = req['user'];
    const { task_id, user_tp_id, tp_day } = req.body;

    const createdAt = await UserTreatmentPlan.findOne({ where: { id: user_tp_id }, attributes: ['createdAt'] });
    // TODO - Wahab's refactoring
    // @ts-ignore
    const day = Math.ceil(((createdAt - new Date()) / 1000) * 60 * 60 * 24);
    const tasks = await UserTreatmentPlanTasks.findOne({
      where: { id: task_id, user_id: id, tp_day: Number(day - tp_day) },
    });

    return sendResponse(res, 200, SUCCESS, tasks);
  } catch (err) {
    throw new APIError(500, INTERNAL_SERVER_ERROR, err);
  }
}

export async function updateCompletedTask(req: Request, res: Response) {
  try {
    const { id } = req['user'];
    const { task_id } = req.body;

    const updatedTasks = await UserTreatmentPlanTasks.update(
      { is_completed: true },
      { where: { id: task_id, user_id: id } }
    );
    sendResponse(res, 200, SUCCESS, updatedTasks);
  } catch (err) {
    throw new APIError(500, INTERNAL_SERVER_ERROR, err);
  }
}
