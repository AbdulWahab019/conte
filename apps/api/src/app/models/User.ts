import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

export interface UserDefinedAttributes {
  id: number;
  email: string;
  password: string;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
}

export interface UserModel extends Model<UserModel, UserDefinedAttributes> {
  id: number;
  email: string;
  password: string;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  createdAt: string;
  updatedAt: string;
}

export const User = sequelize.define<UserModel, UserDefinedAttributes>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  is_terms_of_use_accepted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  is_orientation_video_watched: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

User.sync({ alter: true });
