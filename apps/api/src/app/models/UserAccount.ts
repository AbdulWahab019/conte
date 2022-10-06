'use strict';
import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const UserAccount = sequelize.define('UserAccount', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

UserAccount.sync();

export { UserAccount };
