import { Dialect } from 'sequelize';
import { environment } from '../environments/environment';

const config = {
  database: environment.SQL_DATABASE,
  username: environment.SQL_USERNAME,
  password: environment.SQL_PASSWORD,
  host: environment.SQL_SERVER,
  port: Number(environment.SQL_PORT),
  dialect: 'mssql' as Dialect,
  logging: false,
};

export { config };
