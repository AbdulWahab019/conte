import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { SUCCESS, TREATMENT_PLAN_NOT_ASSIGNED } from '../utils/constants';
import {
  getUserTreatmentPlan,
  getUserTreatmentPlanDetailByUserAndDay,
  getUserTreatmentPlanTasks,
} from '../services/UserTreatmentPlanService';
import moment = require('moment');
import { getUserTreatmentPlanDayByDate } from '../helpers/TreatmentPlanHelper';
import { APIError } from '../utils/apiError';

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

  const month = moment(date).month();
  const totalDaysInMonth = moment().month(month).daysInMonth();

  const day = moment(date).date(1).format('YYYY-MM-DD');

  const userTreatmentPlan = await getUserTreatmentPlan(user_id);
  if (!userTreatmentPlan) throw new APIError(400, TREATMENT_PLAN_NOT_ASSIGNED);

  const { tp_day } = getUserTreatmentPlanDayByDate(day, userTreatmentPlan.assigned_at);

  const TreatmentPlanTasks = await getUserTreatmentPlanTasks(user_id, tp_day, tp_day + totalDaysInMonth - 1);

  const user_tasks = [];

  const userTasks = [];
  let lastDay = { tp_day, total_tasks: 0 };
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const taskDay = TreatmentPlanTasks[i - 1];
    let tp_day, total_tasks;

    if (i - lastDay.tp_day > 1) {
      tp_day = lastDay.tp_day + 1;
      total_tasks = 0;
    } else {
      tp_day = taskDay.tp_day;
      total_tasks = taskDay['total_tasks'];
    }

    userTasks.push({ tp_day, total_tasks });

    lastDay = { tp_day, total_tasks };
  }

  for (let i = 1; i <= totalDaysInMonth; i++) {
    const taskDay = userTasks[i - 1];

    user_tasks.push({
      date: i,
      selected: false,
      ...taskDay,
      day: moment(date)
        .date(i - 1)
        .format('dddd'),
    });
  }
  console.log(user_tasks);
  // Map Data and return

  // const data = [
  //   { date: 1, selected: true, total_tasks: 3, day: 'Monday' },
  //   { date: 2, selected: false, total_tasks: 0, day: 'Tuesday' },
  //   { date: 3, selected: false, total_tasks: 2, day: 'Wednesday' },
  //   { date: 4, selected: false, total_tasks: 1, day: 'Thursday' },
  //   { date: 5, selected: false, total_tasks: 0, day: 'Friday' },
  //   { date: 6, selected: false, total_tasks: 0, day: 'Saturday' },
  //   { date: 7, selected: false, total_tasks: 1, day: 'Sunday' },
  // ];

  return sendResponse(res, 200, SUCCESS, user_tasks);
}
