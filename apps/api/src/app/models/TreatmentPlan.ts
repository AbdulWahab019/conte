import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { Doctor } from './Doctor';
import { Surgery } from './Surgery';
import { TreatmentPlanDetail, TreatmentPlanDetailModel } from './TreatmentPlanDetail';

export interface TreatmentPlanSurgeryData {
  week_from_surgery: number;
  month_from_surgery: number;
}

export interface TreatmentPlanDefinedAttributes extends Partial<TreatmentPlanSurgeryData> {
  id: number;
  name: string;
  doctor_id: number;
  surgery_id?: number;
}

export interface TreatmentPlanModel extends Model<TreatmentPlanModel, TreatmentPlanDefinedAttributes> {
  id: number;
  name: string;
  doctor_id: number;
  surgery_id?: number;
  week_from_surgery?: number;
  month_from_surgery?: number;
  createdAt: string;
  updatedAt: string;
  TreatmentPlanDetails: TreatmentPlanDetailModel[];
}

export const TreatmentPlan = sequelize.define<TreatmentPlanModel, TreatmentPlanDefinedAttributes>('TreatmentPlan', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  doctor_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Doctors', key: 'id' } },
  surgery_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Surgeries', key: 'id' } },
  week_from_surgery: { type: DataTypes.INTEGER, allowNull: true },
  month_from_surgery: { type: DataTypes.FLOAT, allowNull: true },
});

TreatmentPlan.sync();

// Associations
TreatmentPlan.afterSync(() => {
  TreatmentPlan.belongsTo(Doctor, { foreignKey: 'doctor_id', targetKey: 'id' });
  TreatmentPlan.belongsTo(Surgery, { foreignKey: 'surgery_id', targetKey: 'id' });

  TreatmentPlan.hasMany(TreatmentPlanDetail, { foreignKey: 'tp_id', sourceKey: 'id' });
});
