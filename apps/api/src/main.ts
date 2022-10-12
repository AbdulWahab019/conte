import 'express-async-errors';
import * as express from 'express';

import { environment } from './config/config';
import { routes } from './app/routes';
import { sequelize } from './config/db';
import * as cors from 'cors';

const PORT = environment.PORT;
const app = express();

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.log('Unable to connect to database: ', error));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
routes(app);

app.listen(PORT, () => {
  console.log(`${environment.ENV}: Application running at http://localhost:${PORT}`);
});

export = app;
