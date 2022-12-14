import { parse } from 'csv-parse';
import { Attributes, FindOptions, Transaction } from 'sequelize';

import { TreatmentPlan, TreatmentPlanSurgeryData } from '../models/TreatmentPlan';
import {
  TreatmentPlanDetail,
  TreatmentPlanDetailDefinedAttributes,
  TreatmentPlanDetailModel,
  TreatmentPlanDetailsFileAttributes,
} from '../models/TreatmentPlanDetail';

import { transformToTreatmentPlanDetails, validateTreatmentPlanFile } from '../helpers/TreatmentPlanHelper';
import { UserTreatmentPlanTaskFeedback } from '../models/UserTreatmentPlanTaskFeedback';
import { PostTaskFeedbackApiRequest } from '@conte/models';
import { UserTreatmentPlanTasks } from '../models/UserTreatmentPlanTasks';
import { UserTreatmentPlan } from '../models/UserTreatmentPlan';
import { TREATMENT_PLAN_NOT_ASSIGNED } from '../utils/constants';
import { APIError } from '../utils/apiError';
import { Doctor } from '../models/Doctor';
import { Surgery } from '../models/Surgery';
import { sequelize } from '../models';

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
  return await TreatmentPlan.findAll({
    include: [
      {
        model: Doctor,
        as: 'doctor',
        attributes: ['id', 'name'],
      },
      {
        model: Surgery,
        as: 'surgery',
        attributes: ['id', 'name'],
      },
    ],
  });
}

export async function getUserTaskReport(user_id: number) {
  const treatmentPlan = await UserTreatmentPlan.findOne({ where: { user_id }, attributes: ['assigned_at'] });
  if (!treatmentPlan) throw new APIError(400, TREATMENT_PLAN_NOT_ASSIGNED);

  const tasksCount = await UserTreatmentPlanTasks.findAll({
    where: { user_id },
    attributes: ['is_completed', 'is_skipped', [sequelize.fn('COUNT', '*'), 'count']],
    group: ['is_completed', 'is_skipped'],
  });

  const tasksReport = { is_pending: 0, is_skipped: 0, is_completed: 0 };
  tasksCount.forEach((taskCount) => {
    const task = taskCount.toJSON();

    if (task.is_completed) tasksReport.is_completed = task.count;
    else if (task.is_skipped) tasksReport.is_skipped = task.count;
    else tasksReport.is_pending = task.count;
  });

  return tasksReport;
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
        as: 'doctor',
        attributes: ['name'],
      },
      {
        model: Surgery,
        as: 'surgery',
        attributes: ['name'],
      },
    ],
  });
}

export async function updateTreatmentPlanDetailsData(
  tp_id: number,
  tp_day: number,
  data: Omit<TreatmentPlanDetailDefinedAttributes, 'tp_id' | 'tp_day' | 'tp_weekday'>
) {
  return await TreatmentPlanDetail.update(data, { where: { tp_id, tp_day } });
}
