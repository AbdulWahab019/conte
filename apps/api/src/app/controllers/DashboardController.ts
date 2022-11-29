import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { SUCCESS } from '../utils/constants';
import {
  getUserTasksCalendarService,
  getUserTreatmentPlanDetailByUserAndDay,
} from '../services/UserTreatmentPlanService';

export async function getDashboardData(req: Request, res: Response) {
  const { id: user_id } = req['user'];
  const date = (req.query.date as string) || new Date().toISOString();

  const detail = await getUserTreatmentPlanDetailByUserAndDay(user_id, date);

  const apiResp = {
    video_url: detail?.video_url,
    are_tasks_completed: detail?.are_tasks_completed,
    tp_start_date: detail.tp_start_date,
  };

  return sendResponse(res, 201, SUCCESS, apiResp);
}

export async function getUserTasksCalender(req: Request, res: Response) {
  const { id: user_id } = req['user'];
  const { date } = req.params;

  const tasks_calendar = await getUserTasksCalendarService(user_id, date);

  return sendResponse(res, 200, SUCCESS, tasks_calendar);
}
