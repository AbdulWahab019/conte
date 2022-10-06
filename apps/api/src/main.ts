// import * as dotenv from 'dotenv';
// dotenv.config();
import { environment } from '../src/environments/environment';
require('express-async-errors');
import * as express from 'express';
import { routes } from './app/routes';

const PORT = environment.PORT;
const app = express();

import { sequelize } from './config/db';

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.log('Unable to connect to database: ', error));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

routes(app);

app.listen(PORT, () => {
  console.log(`${environment.ENV}: Application running at http://localhost:${PORT}`);
});

export = app;
