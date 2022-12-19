import { parse } from 'csv-parse';
import { Attributes, FindOptions, Op, Transaction } from 'sequelize';

import { TreatmentPlan, TreatmentPlanSurgeryData } from '../models/TreatmentPlan';
import {
  TreatmentPlanDetail,
  TreatmentPlanDetailModel,
  TreatmentPlanDetailsFileAttributes,
} from '../models/TreatmentPlanDetail';

import {
  getUserTreatmentPlanDayByDate,
  transformToTreatmentPlanDetails,
  validateTreatmentPlanFile,
} from '../helpers/TreatmentPlanHelper';
import { UserTreatmentPlanTaskFeedback } from '../models/UserTreatmentPlanTaskFeedback';
import { PostTaskFeedbackApiRequest } from '@conte/models';
import { UserTreatmentPlanTasks } from '../models/UserTreatmentPlanTasks';
import { UserTreatmentPlan } from '../models/UserTreatmentPlan';
import moment = require('moment');
import { TREATMENT_PLAN_NOT_ASSIGNED } from '../utils/constants';
import { APIError } from '../utils/apiError';
import { Doctor } from '../models/Doctor';
import { Surgery } from '../models/Surgery';

export async function createTreatmentPlan(
  name: string,
  doctor_id: number,
  surgery_id: number,
  treatmentPlanFileDetails: TreatmentPlanDetailsFileAttributes[],
  { week_from_surgery, month_from_surgery }: TreatmentPlanSurgeryData,
  { transaction }: { transaction?: Transaction }
) {
  const treatmentPlan = await TreatmentPlan.create(
    { name, doctor_id, surgery_id, week_from_surgery, month_from_surgery },
    { transaction }
  );

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

export function parseTreatmentPlanFileForSurgery(
  file: Express.Multer.File,
  colLine: number
): Promise<TreatmentPlanSurgeryData[]> {
  return new Promise((resolve, reject) => {
    parse(
      file.buffer,
      {
        fromLine: colLine,
        toLine: colLine + 1,
        relaxQuotes: true,
        columns: true,

        onRecord: (record: string[]) => {
          validateTreatmentPlanFile(record);
          return {
            week_from_surgery: Number(record['Week From Sx']) || -1,
            month_from_surgery: Number(record['Month From Sx']) || -1,
          };
        },
      },
      (err, records) => {
        if (err) reject(err);
        resolve(records);
      }
    );
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
  if (!treatmentPlan) throw new APIError(400, TREATMENT_PLAN_NOT_ASSIGNED);

  const date = moment().toDate();

  const { tp_day } = getUserTreatmentPlanDayByDate(date, treatmentPlan.assigned_at);

  const tasks = await UserTreatmentPlanTasks.findAll({
    where: { user_id, [Op.or]: { is_completed: 1, is_skipped: 1, tp_day: { [Op.lte]: tp_day } } },
  });

  const completed_tasks = [];
  const skipped_tasks = [];
  const pending_tasks = [];

  tasks.forEach((task) => {
    if (task.is_completed) completed_tasks.push(task);
    else if (task.is_skipped) skipped_tasks.push(task);
    else pending_tasks.push(task);
  });

  return { completed_tasks, skipped_tasks, pending_tasks };
}

export async function getTreatmentPlanByPK(id: number) {
  return await TreatmentPlan.findByPk(id);
}

export async function getTPDetailsData(id: number) {
  return await TreatmentPlan.findOne({
    where: { id },
    attributes: ['id', 'name', 'week_from_surgery', 'month_from_surgery', 'createdAt', 'updatedAt'],
    include: [
      {
        model: TreatmentPlanDetail,
        attributes: ['tp_day', 'tp_weekday', 'video_url'],
      },
      {
        model: Doctor,
        attributes: ['name'],
      },
      {
        model: Surgery,
        attributes: ['name'],
      },
    ],
  });
}
