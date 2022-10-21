import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { Surgery } from './Surgery';
import { TreatmentPlan } from './TreatmentPlan';

export interface DoctorDefinedAttributes {
  id: number;
  name: string;
  position: string;
}

export interface DoctorModel extends Model<DoctorModel, DoctorDefinedAttributes> {
  id: number;
  name: string;
  position: string;
  createdAt: string;
  updatedAt: string;
}

export const Doctor = sequelize.define<DoctorModel, DoctorDefinedAttributes>('Doctor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  position: DataTypes.STRING,
});

Doctor.sync();

// Associations
Doctor.afterSync(() => {
  Doctor.hasMany(Surgery, { foreignKey: 'doctor_id' });
  Doctor.hasMany(TreatmentPlan, { foreignKey: 'doctor_id' });
});
