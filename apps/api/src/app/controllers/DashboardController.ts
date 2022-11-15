import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { SUCCESS } from '../utils/constants';
import { getUserTreatmentPlanDetailByUserAndDay } from '../services/UserTreatmentPlanService';

export async function getDashboardData(req: Request, res: Response) {
  const { id: user_id } = req['user'];
  const date = (req.query.date as string) || new Date().toISOString();
  
  const detail = await getUserTreatmentPlanDetailByUserAndDay(user_id, date);

  const apiResp = { video_url: detail?.video_url };
  return sendResponse(res, 201, SUCCESS, apiResp);
}
