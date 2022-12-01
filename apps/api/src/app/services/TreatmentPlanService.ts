import { parse } from 'csv-parse';
import { Attributes, FindOptions, Op, Transaction } from 'sequelize';

import { TreatmentPlan } from '../models/TreatmentPlan';
import {
  TreatmentPlanDetail,
  TreatmentPlanDetailModel,
  TreatmentPlanDetailsFileAttributes,
} from '../models/TreatmentPlanDetail';

import { getUserTreatmentPlanDayByDate, transformToTreatmentPlanDetails } from '../helpers/TreatmentPlanHelper';
import { UserTreatmentPlanTaskFeedback } from '../models/UserTreatmentPlanTaskFeedback';
import { PostTaskFeedbackApiRequest } from '@conte/models';
import { UserTreatmentPlanTasks } from '../models/UserTreatmentPlanTasks';
import { UserTreatmentPlan } from '../models/UserTreatmentPlan';
import moment = require('moment');

export async function createTreatmentPlan(
  name: string,
  doctor_id: number,
  surgery_id: number,
  treatmentPlanFileDetails: TreatmentPlanDetailsFileAttributes[],
  { transaction }: { transaction?: Transaction }
) {
  const treatmentPlan = await TreatmentPlan.create({ name, doctor_id, surgery_id }, { transaction });

  const treatmentPlanDetails = treatmentPlanFileDetails.map((detail) => ({ ...detail, tp_id: treatmentPlan.id }));
  await TreatmentPlanDetail.bulkCreate(treatmentPlanDetails, { transaction });

  return treatmentPlan;
}

export async function getTreatmentPlanByDoctorAndSurgery(doctor_id: number, surgery_id?: number) {
  const where = Object.assign({}, { doctor_id }, surgery_id ? { surgery_id } : { surgery_id: null });
  return await TreatmentPlan.findOne({
    where,
    attributes: { exclude: ['created_at', 'updated_at'] },
    include: TreatmentPlanDetail,
  });
}

export async function getTreatmentPlanDetails(params: FindOptions<Attributes<TreatmentPlanDetailModel>>) {
  return await TreatmentPlanDetail.findAll(params);
}

export function parseTreatmentPlanFile(
  file: Express.Multer.File,
  from = 2,
  to: number
): Promise<TreatmentPlanDetailsFileAttributes[]> {
  return new Promise((resolve, reject) => {
    parse(file.buffer, { from, to, relaxQuotes: true, onRecord: transformToTreatmentPlanDetails }, (err, records) => {
      if (err) reject(err);

      resolve(records);
    });
  });
}

export async function createUserTaskFeedBack(data: PostTaskFeedbackApiRequest[]) {
  return await UserTreatmentPlanTaskFeedback.bulkCreate(data);
}

export async function getUserTaskFeedback(task_id: number) {
  return await UserTreatmentPlanTaskFeedback.findAll({ attributes: ['id', 'feedback', 'type'], where: { task_id } });
}

export async function skipTPDayTasks(user_id: number, tp_day: number) {
  return await UserTreatmentPlanTasks.update({ is_skipped: true }, { where: { user_id, tp_day } });
}

export async function getTreatmentPlans() {
  return await TreatmentPlan.findAll();
}

export async function getUserSkippedAndCompletedTasks(user_id: number) {
  const treatmentPlan = await UserTreatmentPlan.findOne({ where: { user_id }, attributes: ['assigned_at'] });

  const date = moment().toDate();

  const { tp_day } = getUserTreatmentPlanDayByDate(date, treatmentPlan.assigned_at);

  const tasks = await UserTreatmentPlanTasks.findAll({
    where: { user_id, [Op.or]: { is_completed: 1, is_skipped: 1, tp_day: { [Op.lte]: tp_day } } },
  });

  const completed_tasks = [];
  const skipped_tasks = [];
  const pending_tasks = [];

  tasks.map((task) => {
    if (task.is_completed) completed_tasks.push(task);
    else if (task.is_skipped) skipped_tasks.push(task);
    else pending_tasks.push(task);
  });

  return { completed_tasks, skipped_tasks, pending_tasks };
}
