import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { User } from './User';
import { TreatmentPlan } from './TreatmentPlan';
import { UserTreatmentPlanDetail } from './UserTreatmentPlanDetail';

export interface UserTreatmentPlanDefinedAttributes {
  id: number;
  name: string;
  user_id: number;
  tp_id: number;
}

export interface UserTreatmentPlanModel extends Model<UserTreatmentPlanModel, UserTreatmentPlanDefinedAttributes> {
  id: number;
  name: string;
  user_id: number;
  tp_id: number;
  createdAt: string;
  updatedAt: string;
}

export const UserTreatmentPlan = sequelize.define<UserTreatmentPlanModel, UserTreatmentPlanDefinedAttributes>(
  'UserTreatmentPlan',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'unique_user_treatment_plan',
      references: { model: 'users', key: 'id' },
    },
    tp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'unique_user_treatment_plan',
      references: { model: 'treatment_plans', key: 'id' },
    },
  }
);

UserTreatmentPlan.sync();

// Associations
UserTreatmentPlan.afterSync(() => {
  UserTreatmentPlan.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
  UserTreatmentPlan.belongsTo(TreatmentPlan, { foreignKey: 'tp_id', targetKey: 'id' });

  UserTreatmentPlan.hasMany(UserTreatmentPlanDetail, {
    foreignKey: 'user_tp_id',
    sourceKey: 'id',
  });
});
