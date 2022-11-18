import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { SUCCESS } from '../utils/constants';
import { getUserTreatmentPlanDetailByUserAndDay } from '../services/UserTreatmentPlanService';

export async function getDashboardData(req: Request, res: Response) {
  const { id: user_id } = req['user'];
  const date = (req.query.date as string) || new Date().toISOString();

  const detail = await getUserTreatmentPlanDetailByUserAndDay(user_id, date);

  const apiResp = { video_url: detail?.tp_detail?.video_url, are_tasks_completed: detail?.are_tasks_completed };
  return sendResponse(res, 201, SUCCESS, apiResp);
}
