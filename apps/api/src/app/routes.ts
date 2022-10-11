import { Application } from 'express';

import { error } from './middlewares/error';
import UserAccountRoutes from './routes/UserAccountRoute';
import SubscriptionRoutes from './routes/SubscriptionRoute';

export function routes(app: Application) {
  app.use('/account', UserAccountRoutes);
  app.use('/subscription', SubscriptionRoutes);

  app.use(error);
}
