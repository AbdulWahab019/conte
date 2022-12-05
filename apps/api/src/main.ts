import 'express-async-errors';

import express = require('express');
import cors = require('cors');

import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import { environment } from './config/config';
import { routes } from './app/routes';
import { sequelize } from './config/db';

const PORT = environment.PORT;
const app = express();

if (environment.ENV !== 'dev') {
  Sentry.init({
    dsn: environment.SENTRY_DSN,
    integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
    environment: environment.ENV,
    release: environment.SENTRY_RELEASE,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '5mb', verify: (req: express.Request, res, buf) => (req['rawBody'] = buf.toString()) }));
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());

routes(app);

app.use(Sentry.Handlers.errorHandler());

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.log('Unable to connect to database: ', error));

app.listen(PORT, () => {
  console.log(`${environment.ENV}: Application running at http://localhost:${PORT}`);
});

export = app;
