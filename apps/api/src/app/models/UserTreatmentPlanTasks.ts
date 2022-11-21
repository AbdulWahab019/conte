import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { UserTreatmentPlan } from './UserTreatmentPlan';
import { User } from './User';
import { UserTreatmentPlanTaskFeedback } from './UserTreatmentPlanTaskFeedback';
import { UserTreatmentPlanDetail } from './UserTreatmentPlanDetail';

export interface UserTreatmentPlanTasksDefinedAttributes {
  id?: number;
  user_id: number;
  user_tp_id: number;
  tp_day: number;
  task_type: number;
  title: string;
  is_completed: boolean;
  is_skipped: boolean;
}

export interface UserTreatmentPlanTasksModel
  extends Model<UserTreatmentPlanTasksModel, UserTreatmentPlanTasksDefinedAttributes> {
  id?: number;
  user_id: number;
  user_tp_id: number;
  tp_day: number;
  task_type: number;
  title: string;
  is_completed: boolean;
  is_skipped: boolean;
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
  task_type: { type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING },
  is_completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_skipped: { type: DataTypes.BOOLEAN, defaultValue: false },
});

UserTreatmentPlanTasks.sync();

// Associations
UserTreatmentPlanTasks.afterSync(() => {
  UserTreatmentPlanTasks.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
  UserTreatmentPlanTasks.belongsTo(UserTreatmentPlan, { foreignKey: 'user_tp_id', targetKey: 'id' });

  UserTreatmentPlanTasks.belongsTo(UserTreatmentPlanDetail, { foreignKey: 'tp_day', targetKey: 'tp_day' });

  UserTreatmentPlanTasks.hasMany(UserTreatmentPlanTaskFeedback, { foreignKey: 'task_id', as: 'feedback' });
});
