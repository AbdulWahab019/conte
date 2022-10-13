import { Sequelize } from 'sequelize';
import { environment } from './config';
import * as tedious from 'tedious';

export const sequelize = new Sequelize(environment.SQL_DATABASE, environment.SQL_USERNAME, environment.SQL_PASSWORD, {
  host: environment.SQL_SERVER,
  port: Number(environment.SQL_PORT),
  logging: false,
  dialect: 'mssql',
  dialectModule: tedious,
});
