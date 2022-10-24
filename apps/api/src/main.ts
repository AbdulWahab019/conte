import 'express-async-errors';
import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';

import { environment } from './config/config';
import { routes } from './app/routes';
import { sequelize } from './config/db';

const PORT = environment.PORT;
const app = express();

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.log('Unable to connect to database: ', error));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());

routes(app);

app.listen(PORT, () => {
  console.log(`${environment.ENV}: Application running at http://localhost:${PORT}`);
});

export = app;
