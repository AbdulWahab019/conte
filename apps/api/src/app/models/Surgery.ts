import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { Doctor } from './Doctor';
import { TreatmentPlan } from './TreatmentPlan';

export interface SurgeryDefinedAttributes {
  id: number;
  doctor_id: number;
  name: string;
}

export interface SurgeryModel extends Model<SurgeryModel, SurgeryDefinedAttributes> {
  id: number;
  name: string;
  doctor_id: number;
  createdAt: string;
  updatedAt: string;
}

export const Surgery = sequelize.define<SurgeryModel, SurgeryDefinedAttributes>('Surgery', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  doctor_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Doctors', key: 'id' } },
});

Surgery.sync();

// Associations
Surgery.afterSync(() => {
  Surgery.belongsTo(Doctor, { foreignKey: 'doctor_id', targetKey: 'id' });
  Surgery.hasMany(TreatmentPlan, { foreignKey: 'surgery_id' });
});
