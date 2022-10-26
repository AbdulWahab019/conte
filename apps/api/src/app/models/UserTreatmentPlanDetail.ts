import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { UserTreatmentPlan } from './UserTreatmentPlan';

export interface UserTreatmentPlanDetailDefinedAttributes {
  id?: number;
  user_tp_id: number;
  tp_day: number;
  tp_weekday: string;
  week_from_sx: number;
  month_from_sx: number;
  plyo_throw: number;
  max_distance: number;
  max_velocity_percent: number;
  max_velocity_absolute: number;
  num_throws_at_max_distance: number;
  post_max_distance_flat_ground: number;
  post_max_distance_flat_ground_velocity_percent: number;
  post_max_distance_flat_ground_velocity_absolute: number;
  post_max_flat_ground_pitches: string;
  bullpen: number;
  bullpen_max_velocity_percent: number;
  bullpen_max_velocity_absolute: number;
  bullpen_pitches: string;
  live_simulated_game: number;
  innings: number;
}

export interface UserTreatmentPlanDetailModel
  extends Model<UserTreatmentPlanDetailModel, UserTreatmentPlanDetailDefinedAttributes> {
  id: number;
  created_at: string;
  updated_at: string;
}

export const UserTreatmentPlanDetail = sequelize.define<
  UserTreatmentPlanDetailModel,
  UserTreatmentPlanDetailDefinedAttributes
>('UserTreatmentPlanDetail', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_tp_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'user_treatment_plans', key: 'id' } },
  tp_day: { type: DataTypes.INTEGER, allowNull: false },
  tp_weekday: { type: DataTypes.STRING, allowNull: false },
  week_from_sx: DataTypes.INTEGER,
  month_from_sx: DataTypes.FLOAT,
  plyo_throw: DataTypes.INTEGER,
  max_distance: DataTypes.INTEGER,
  max_velocity_percent: DataTypes.FLOAT,
  max_velocity_absolute: DataTypes.DECIMAL(10, 2),
  num_throws_at_max_distance: DataTypes.INTEGER,
  post_max_distance_flat_ground: DataTypes.INTEGER,
  post_max_distance_flat_ground_velocity_percent: DataTypes.FLOAT,
  post_max_distance_flat_ground_velocity_absolute: DataTypes.DECIMAL(10, 2),
  post_max_flat_ground_pitches: DataTypes.STRING,
  bullpen: DataTypes.INTEGER,
  bullpen_max_velocity_percent: DataTypes.FLOAT,
  bullpen_max_velocity_absolute: DataTypes.DECIMAL(10, 2),
  bullpen_pitches: DataTypes.STRING,
  live_simulated_game: DataTypes.INTEGER,
  innings: DataTypes.INTEGER,
});

UserTreatmentPlanDetail.sync({ alter: true, force: true });

// Associations
UserTreatmentPlanDetail.afterSync(() => {
  UserTreatmentPlanDetail.belongsTo(UserTreatmentPlan, { foreignKey: 'user_tp_id', targetKey: 'id' });
});
