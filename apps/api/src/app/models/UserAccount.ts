import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

export interface UserAccountDefinedAttributes {
  id: number;
  email: string;
  password: string;
}

export interface UserAccountModel extends Model<UserAccountModel, UserAccountDefinedAttributes> {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export const UserAccount = sequelize.define<UserAccountModel, UserAccountDefinedAttributes>('UserAccount', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

UserAccount.sync();
