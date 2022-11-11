import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { UserTreatmentPlan } from './UserTreatmentPlan';
import { User } from './User';

export interface UserTreatmentPlanTasksDefinedAttributes {
  id?: number;
  user_id: number;
  user_tp_id: number;
  tp_day: number;
  title: string;
  comment1: boolean;
  comment2: boolean;
  comment3: boolean;
  comment4: boolean;
  is_completed: boolean;
}

export interface UserTreatmentPlanTasksModel
  extends Model<UserTreatmentPlanTasksModel, UserTreatmentPlanTasksDefinedAttributes> {
  id?: number;
  user_id: number;
  user_tp_id: number;
  tp_day: number;
  title: string;
  comment1: boolean;
  comment2: boolean;
  comment3: boolean;
  comment4: boolean;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export const UserTreatmentPlanTasks = sequelize.define<
  UserTreatmentPlanTasksModel,
  UserTreatmentPlanTasksDefinedAttributes
>('UserTreatmentPlanTasks', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  user_tp_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'user_treatment_plans', key: 'id' } },
  tp_day: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING },
  comment1: { type: DataTypes.BOOLEAN },
  comment2: { type: DataTypes.BOOLEAN },
  comment3: { type: DataTypes.BOOLEAN },
  comment4: { type: DataTypes.BOOLEAN },
  is_completed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

UserTreatmentPlanTasks.sync();

// Associations
UserTreatmentPlanTasks.afterSync(() => {
  UserTreatmentPlanTasks.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
  UserTreatmentPlanTasks.belongsTo(UserTreatmentPlan, { foreignKey: 'user_tp_id', targetKey: 'id' });
});
