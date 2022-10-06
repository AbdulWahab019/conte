import { Sequelize } from 'sequelize';
// import { config } from './config';

const sequelize = new Sequelize('simple-poc', 'poc-user', '123456', {
  host: '127.0.0.1',
  dialect: 'mssql',
  port: 1433,
  logging: false,
});

export { sequelize };
