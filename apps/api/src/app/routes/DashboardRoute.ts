import { Router } from 'express';
import { getDashboardData, getUserTasksCalender } from '../controllers/DashboardController';
import { authorize } from '../middlewares/auth';

const router = Router();

router.get('/', authorize, getDashboardData);

router.get('/calender/date/:date', authorize, getUserTasksCalender);

export default router;
