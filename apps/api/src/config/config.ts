import { Dialect } from 'sequelize';

const config = {
  database: process.env.SQL_DATABASE,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  host: process.env.SQL_SERVER,
  port: Number(process.env.SQL_PORT),
  dialect: 'mssql' as Dialect,
  logging: false,
};

export { config };
