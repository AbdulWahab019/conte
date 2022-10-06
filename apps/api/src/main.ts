import * as dotenv from 'dotenv';
dotenv.config();
require('express-async-errors');
import * as express from 'express';
import { routes } from './app/routes';

const PORT = process.env.PORT;
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
  console.log(
    `${process.env.ENV}: Application running at http://localhost:${PORT}`
  );
});

export = app;
