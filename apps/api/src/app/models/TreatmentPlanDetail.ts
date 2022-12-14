import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { TreatmentPlan } from './TreatmentPlan';

export interface TreatmentPlanDetailsFileAttributes {
  tp_day: number;
  tp_weekday: string;
  week_from_sx: number;
  month_from_sx: number;
  week_of_throwing: number;
  month_of_throwing: number;
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
  video_url: string;
}

export interface TreatmentPlanDetailDefinedAttributes {
  id?: number;
  tp_id: number;
  tp_day: number;
  tp_weekday: string;
  week_from_sx: number;
  month_from_sx: number;
  week_of_throwing: number;
  month_of_throwing: number;
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
  video_url: string;
}

export interface TreatmentPlanDetailModel
  extends Model<TreatmentPlanDetailModel, TreatmentPlanDetailDefinedAttributes> {
  id: number;
  tp_id: number;
  tp_day: number;
  tp_weekday: string;
  week_from_sx: number;
  month_from_sx: number;
  week_of_throwing: number;
  month_of_throwing: number;
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
  video_url: string;
  created_at: string;
  updated_at: string;
}

export const TreatmentPlanDetail = sequelize.define<TreatmentPlanDetailModel, TreatmentPlanDetailDefinedAttributes>(
  'TreatmentPlanDetail',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tp_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Treatment_plans', key: 'id' } },
    tp_day: { type: DataTypes.INTEGER, allowNull: false },
    tp_weekday: { type: DataTypes.STRING, allowNull: false },
    week_from_sx: DataTypes.INTEGER,
    month_from_sx: DataTypes.FLOAT,
    week_of_throwing: DataTypes.INTEGER,
    month_of_throwing: DataTypes.INTEGER,
    plyo_throw: DataTypes.INTEGER,
    max_distance: DataTypes.INTEGER,
    max_velocity_percent: DataTypes.FLOAT,
    max_velocity_absolute: DataTypes.FLOAT,
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
    video_url: DataTypes.STRING,
  }
);

TreatmentPlanDetail.sync();

// Associations
TreatmentPlanDetail.afterSync(() => {
  TreatmentPlanDetail.belongsTo(TreatmentPlan, { foreignKey: 'tp_id', targetKey: 'id' });
});
