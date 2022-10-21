import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { Doctor } from './Doctor';
import { Surgery } from './Surgery';
import { TreatmentPlanDetail } from './TreatmentPlanDetail';

export interface TreatmentPlanDefinedAttributes {
  id: number;
  name: string;
  doctor_id: number;
  surgery_id: number;
}

export interface TreatmentPlanModel extends Model<TreatmentPlanModel, TreatmentPlanDefinedAttributes> {
  id: number;
  name: string;
  doctor_id: number;
  surgery_id: number;
  createdAt: string;
  updatedAt: string;
}

export const TreatmentPlan = sequelize.define<TreatmentPlanModel, TreatmentPlanDefinedAttributes>('TreatmentPlan', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  doctor_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Doctors', key: 'id' } },
  surgery_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Surgeries', key: 'id' } },
});

TreatmentPlan.sync();

// Associations
TreatmentPlan.afterSync(() => {
  TreatmentPlan.belongsTo(Doctor, { foreignKey: 'doctor_id', targetKey: 'id' });
  Surgery.belongsTo(Surgery, { foreignKey: 'surgery_id', targetKey: 'id' });

  TreatmentPlan.hasMany(TreatmentPlanDetail, { foreignKey: 'tp_id', sourceKey: 'id', onDelete: 'CASCADE' });
});
