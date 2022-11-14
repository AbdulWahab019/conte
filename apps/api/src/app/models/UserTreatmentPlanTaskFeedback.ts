import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { UserTreatmentPlanTasks } from './UserTreatmentPlanTasks';

export interface UserTreatmentPlanTaskFeedbackDefinedAttributes {
  id?: number;
  task_id: number;
  feedback: string;
  type: number;
}

export interface UserTreatmentPlanTaskFeedbackModel
  extends Model<UserTreatmentPlanTaskFeedbackModel, UserTreatmentPlanTaskFeedbackDefinedAttributes> {
  id?: number;
  task_id: number;
  feedback: string;
  type: number;
  created_at: string;
  updated_at: string;
}

export const UserTreatmentPlanTaskFeedback = sequelize.define<
  UserTreatmentPlanTaskFeedbackModel,
  UserTreatmentPlanTaskFeedbackDefinedAttributes
>('UserTreatmentPlanTaskFeedback', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  task_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'user_treatment_plan_tasks', key: 'id' } },
  feedback: { type: DataTypes.STRING(2000) },
  type: { type: DataTypes.INTEGER },
});

UserTreatmentPlanTaskFeedback.sync();

// Associations
UserTreatmentPlanTaskFeedback.afterSync(() => {
  UserTreatmentPlanTaskFeedback.belongsTo(UserTreatmentPlanTasks, { foreignKey: 'task_id', targetKey: 'id' });
});
