import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { UserTreatmentPlanTasks } from './UserTreatmentPlanTasks';

export interface UserTreatmentPlanTaskFeedbackDefinedAttributes {
  id?: number;
  task_id: number;
  question: string;
  feedback: string;
  type: number;
}

export interface UserTreatmentPlanTaskFeedbacksModel
  extends Model<UserTreatmentPlanTaskFeedbacksModel, UserTreatmentPlanTaskFeedbackDefinedAttributes> {
  id?: number;
  task_id: number;
  question: string;
  feedback: string;
  type: number;
  created_at: string;
  updated_at: string;
}

export const UserTreatmentPlanTaskFeedbacks = sequelize.define<
  UserTreatmentPlanTaskFeedbacksModel,
  UserTreatmentPlanTaskFeedbackDefinedAttributes
>('UserTreatmentPlanTaskFeedback', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  task_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'user_treatment_plan_tasks', key: 'id' } },
  question: { type: DataTypes.STRING, allowNull: true },
  feedback: { type: DataTypes.STRING(2000) },
  type: { type: DataTypes.INTEGER },
});

UserTreatmentPlanTaskFeedbacks.sync({ alter: true });

// Associations
UserTreatmentPlanTaskFeedbacks.afterSync(() => {
  UserTreatmentPlanTaskFeedbacks.belongsTo(UserTreatmentPlanTasks, { foreignKey: 'task_id', targetKey: 'id' });
});
