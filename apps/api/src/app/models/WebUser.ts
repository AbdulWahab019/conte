import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

export interface WebUserDefinedAttributes {
  id: number;
  email: string;
  password: string;
  is_verified: boolean;
}

export interface WebUserModel extends Model<WebUserModel, WebUserDefinedAttributes> {
  id: number;
  email: string;
  password: string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const WebUser = sequelize.define<WebUserModel, WebUserDefinedAttributes>('WebUser', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
});

WebUser.sync();
