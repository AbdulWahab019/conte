import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { Questionnaire, QuestionnaireModel } from './Questionnaire';
import { UserTreatmentPlan } from './UserTreatmentPlan';

export interface UserProfile {
  email?: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  estimated_max_velocity: number;
}

export interface UserDefinedAttributes {
  id: number;
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  email: string;
  password: string;
  estimated_max_velocity: number;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  is_subscribed: boolean;
}

export interface UserModel extends Model<UserModel, UserDefinedAttributes> {
  id: number;
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  email: string;
  password: string;
  estimated_max_velocity: number;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  is_subscribed: boolean;
  questionnaires?: QuestionnaireModel[];
  createdAt: string;
  updatedAt: string;
}

export const User = sequelize.define<UserModel, UserDefinedAttributes>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING(20) },
  last_name: { type: DataTypes.STRING(20) },
  cell_phone: { type: DataTypes.STRING(12) },
  birth_date: { type: DataTypes.DATEONLY },
  address: { type: DataTypes.STRING(120) },
  city: { type: DataTypes.STRING(20) },
  state: { type: DataTypes.STRING(15) },
  zip_code: { type: DataTypes.STRING(5) },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  estimated_max_velocity: { type: DataTypes.INTEGER },
  stripe_customer_id: { type: DataTypes.STRING },
  stripe_subscription_id: { type: DataTypes.STRING },
  is_terms_of_use_accepted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  is_orientation_video_watched: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  is_subscribed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

User.sync();

// Associations
User.afterSync(() => {
  User.hasMany(Questionnaire, { foreignKey: 'user_id' });

  User.hasOne(UserTreatmentPlan, { foreignKey: 'user_id' });
});
