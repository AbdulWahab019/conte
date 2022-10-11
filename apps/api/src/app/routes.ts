import { Application } from 'express';

import { error } from './middlewares/error';
import UserRoutes from './routes/UserRoute';
import SubscriptionRoutes from './routes/SubscriptionRoute';

export function routes(app: Application) {
  app.use('/account', UserRoutes);
  app.use('/subscription', SubscriptionRoutes);

  app.use(error);
}
