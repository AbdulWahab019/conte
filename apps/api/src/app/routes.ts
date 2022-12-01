import { Application } from 'express';

import { error } from './middlewares/error';
import AuthRoutes from './routes/AuthRoute';
import UserRoutes from './routes/UserRoute';
import SubscriptionRoutes from './routes/SubscriptionRoute';
import QuestionnaireRoute from './routes/QuestionnaireRoute';
import TreatmentPlanRoute from './routes/TreatmentPlanRoute';
import SurgeryRoute from './routes/SurgeryRoute';
import DoctorRoute from './routes/DoctorRoute';
import WebhookRoute from './routes/WebhookRoute';
import DashboardRoute from './routes/DashboardRoute';

export function routes(app: Application) {
  app.use('/auth', AuthRoutes);
  app.use('/user', UserRoutes);
  app.use('/subscription', SubscriptionRoutes);
  app.use('/questionnaire', QuestionnaireRoute);
  app.use('/treatment-plan', TreatmentPlanRoute);
  app.use('/doctor', DoctorRoute);
  app.use('/surgery', SurgeryRoute);
  app.use('/dashboard', DashboardRoute);
  app.use('/webhook', WebhookRoute);

  app.use(error);
}
