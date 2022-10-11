import { Application } from 'express';

import { error } from './middlewares/error';
import AuthRoutes from './routes/AuthRoute';
import UserRoutes from './routes/UserRoute';
import SubscriptionRoutes from './routes/SubscriptionRoute';

export function routes(app: Application) {
  app.use('/auth', AuthRoutes);
  app.use('/user', UserRoutes);
  app.use('/subscription', SubscriptionRoutes);

  app.use(error);
}
