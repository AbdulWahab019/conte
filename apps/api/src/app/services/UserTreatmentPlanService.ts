import moment = require('moment');
import { Op, Transaction } from 'sequelize';

import { TreatmentPlanModel } from '../models/TreatmentPlan';
import { UserTreatmentPlan } from '../models/UserTreatmentPlan';
import { UserTreatmentPlanDetail, UserTreatmentPlanDetailDefinedAttributes } from '../models/UserTreatmentPlanDetail';
import { UserTreatmentPlanTasks } from '../models/UserTreatmentPlanTasks';
import { getTasksFromTPDay, getUserTreatmentPlanDayByDate } from '../helpers/TreatmentPlanHelper';
import { APIError } from '../utils/apiError';
import { TREATMENT_PLAN_NOT_ASSIGNED } from '../utils/constants';
import { UserTreatmentPlanTaskFeedback } from '../models/UserTreatmentPlanTaskFeedback';
import { TPStatus } from '@conte/models';
import { sequelize } from '../models';

export async function createUserTreatmentPlan(
  user_id: number,
  user_estimated_max_velocity: number,
  treatment_plan: TreatmentPlanModel,
  name: string,
  surgery_date: string,
  { transaction = undefined }: { transaction?: Transaction } = {}
) {
  let assigned_at = surgery_date
    ? moment(surgery_date).add(18, 'weeks').format('YYYY-MM-DD')
    : moment().add(1, 'day').format('YYYY-MM-DD');

  const assigned_at_day = moment(assigned_at).day();

  if (assigned_at_day === 0) {
    assigned_at = moment(assigned_at).add(1, 'day').format('YYYY-MM-DD');
  } else if (assigned_at_day !== 1) {
    assigned_at = moment(assigned_at).add(1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD');
  }

  // Create User Treatment Plan
  const userTreatmentPlan = await UserTreatmentPlan.create(
    { name, user_id, tp_id: treatment_plan.id, assigned_at },
    { transaction }
  );

  const userTreatmentPlanDetailsData = treatment_plan.TreatmentPlanDetails.map((detail) => {
    delete detail.id;

    return {
      user_tp_id: userTreatmentPlan.id,
      ...detail,
      max_velocity_absolute: Number((user_estimated_max_velocity * (detail.max_velocity_percent / 100)).toFixed(0)),
      post_max_distance_flat_ground_velocity_absolute: Number(
        (user_estimated_max_velocity * (detail.post_max_distance_flat_ground_velocity_percent / 100)).toFixed(0)
      ),
      bullpen_max_velocity_absolute: Number(
        (user_estimated_max_velocity * (detail.bullpen_max_velocity_percent / 100)).toFixed(0)
      ),
    };
  });

  const tasks = userTreatmentPlanDetailsData.flatMap((user_tp_detail: UserTreatmentPlanDetailDefinedAttributes) => {
    const tp_day_tasks = getTasksFromTPDay(user_tp_detail);

    return tp_day_tasks.map((task) => ({
      user_id,
      user_tp_id: userTreatmentPlan.id,
      tp_day: user_tp_detail.tp_day,
      title: task.title,
      task_type: task.type,
    }));
  });

  // Create User Treatment Plan Details
  await Promise.all([
    await UserTreatmentPlanDetail.bulkCreate(userTreatmentPlanDetailsData, { transaction }),
    await UserTreatmentPlanTasks.bulkCreate(tasks, { transaction }),
  ]);

  return userTreatmentPlan;
}

export async function getUserTasksByDate(user_id: number, date: string) {
  const treatmentPlan = await UserTreatmentPlan.findOne({ where: { user_id }, attributes: ['assigned_at'] });
  if (!treatmentPlan) return new APIError(400, TREATMENT_PLAN_NOT_ASSIGNED);

  const { tp_day, formattedTpDate } = getUserTreatmentPlanDayByDate(date, treatmentPlan.assigned_at);

  let status = TPStatus.STARTED;
  if (tp_day <= 0) status = TPStatus.NOT_STARTED;

  const todays_tasks = await UserTreatmentPlanTasks.findAll({
    where: { user_id, tp_day, is_skipped: 0 },
    include: [{ model: UserTreatmentPlanTaskFeedback, as: 'feedback' }],
  });

  const pending_tasks = await UserTreatmentPlanTasks.findAll({
    where: {
      user_id,
      is_completed: 0,
      is_skipped: 0,
      tp_day: { [Op.lt]: tp_day },
    },
    attributes: ['tp_day'],
    group: 'tp_day',
  });

  const pending_tasks_dates = pending_tasks.map((task) =>
    moment(formattedTpDate)
      .add(task.tp_day - 1, 'days')
      .format('YYYY-MM-DD')
  );

  return { todays_tasks, pending_tasks_dates, status };
}

export async function updateUserTask(task_id: number, status: boolean, user_id: number, comment: string) {
  if (comment) await UserTreatmentPlanTaskFeedback.create({ task_id, feedback: comment, type: 1 });
  return await UserTreatmentPlanTasks.update({ is_completed: status }, { where: { id: task_id, user_id } });
}

export async function getUserTreatmentPlanDetailByUserAndDay(user_id: number, date: string) {
  const treatmentPlan = await UserTreatmentPlan.findOne({ where: { user_id }, attributes: ['id', 'assigned_at'] });
  if (!treatmentPlan) throw new APIError(400, TREATMENT_PLAN_NOT_ASSIGNED);

  const { tp_day } = getUserTreatmentPlanDayByDate(date, treatmentPlan.assigned_at);

  const tp_start_date = moment(treatmentPlan.assigned_at).format('YYYY-MM-DD');

  const tp_detail = await UserTreatmentPlanDetail.findOne({
    where: { user_tp_id: treatmentPlan.id, tp_day },
    attributes: ['video_url'],
  });

  const are_tasks_completed =
    (await UserTreatmentPlanTasks.count({ where: { user_id, tp_day, is_completed: false } })) === 0;

  return { video_url: tp_detail?.video_url, are_tasks_completed, tp_start_date };
}

export async function getUserTreatmentPlan(user_id: number) {
  return await UserTreatmentPlan.findOne({
    where: { user_id },
  });
}

export async function getUserTreatmentPlanTasks(user_id: number, start_tp_day: number, end_tp_day: number) {
  return await UserTreatmentPlanTasks.findAll({
    attributes: [
      'tp_day',
      [sequelize.fn('COUNT', 'tp_day'), 'total_tasks'],
      [sequelize.literal(`sum(IIF(is_completed = 1, 1, 0))`), 'completed_tasks'],
      [sequelize.literal(`sum(IIF(is_skipped = 1, 1, 0))`), 'skipped_tasks'],
    ],
    where: {
      user_id,
      tp_day: { [Op.gte]: start_tp_day, [Op.lte]: end_tp_day },
    },
    group: ['tp_day'],
    order: [['tp_day', 'ASC']],
  });
}

export async function getUserTasksCalendarService(user_id: number, date: string) {
  const month = moment(date).month();
  const monthFirstDate = moment(date).startOf('month');
  const totalDaysInMonth = moment().month(month).daysInMonth();

  const day = moment(date).date(1).format('YYYY-MM-DD');

  const userTreatmentPlan = await getUserTreatmentPlan(user_id);
  if (!userTreatmentPlan) throw new APIError(400, TREATMENT_PLAN_NOT_ASSIGNED);

  const { tp_day } = getUserTreatmentPlanDayByDate(day, userTreatmentPlan.assigned_at);
  const end_tp_day = tp_day + totalDaysInMonth - 1;

  const TreatmentPlanTasks = await getUserTreatmentPlanTasks(user_id, tp_day, end_tp_day);

  const user_tasks = [];
  for (let i = tp_day; i <= end_tp_day; i++) {
    const taskDay = TreatmentPlanTasks.find((task) => task.tp_day === i)?.toJSON() || {
      tp_day: i,
      total_tasks: 0,
      completed_tasks: 0,
      skipped_tasks: 0,
    };
    const task_date =
      i === tp_day ? monthFirstDate.format('YYYY-MM-DD') : monthFirstDate.add(1, 'day').format('YYYY-MM-DD');

    user_tasks.push({
      tp_day: taskDay.tp_day,
      total_tasks: taskDay.total_tasks,
      completed_tasks: taskDay.completed_tasks,
      skipped_tasks: taskDay.skipped_tasks,
      date: task_date,
      selected: moment(task_date).diff(moment(), 'days') === 0,
      day: moment(task_date).format('dddd'),
    });
  }

  return user_tasks;
}
