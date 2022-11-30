import { Router } from 'express';
import { getDashboardData, getUserTasksCalendar } from '../controllers/DashboardController';
import { authorize } from '../middlewares/auth';

const router = Router();

router.get('/', authorize, getDashboardData);

router.get('/calendar/date/:date', authorize, getUserTasksCalendar);

export default router;
