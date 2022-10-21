import { Application } from 'express';

import { error } from './middlewares/error';
import AuthRoutes from './routes/AuthRoute';
import UserRoutes from './routes/UserRoute';
import SubscriptionRoutes from './routes/SubscriptionRoute';
import QuestionnaireRoute from './routes/QuestionnaireRoute';
import TreatmentPlanRoute from './routes/TreatmentPlanRoute';

export function routes(app: Application) {
  app.use('/auth', AuthRoutes);
  app.use('/user', UserRoutes);
  app.use('/subscription', SubscriptionRoutes);
  app.use('/questionnaire', QuestionnaireRoute);
  app.use('/treatment-plan', TreatmentPlanRoute);

  app.use(error);
}
