import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

export interface UserDefinedAttributes {
  id: number;
  email: string;
  password: string;
}

export interface UserModel extends Model<UserModel, UserDefinedAttributes> {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export const User = sequelize.define<UserModel, UserDefinedAttributes>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

User.sync({ alter: true });
