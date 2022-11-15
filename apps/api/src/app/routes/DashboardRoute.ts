import { Router } from 'express';
import { getDashboardData } from '../controllers/DashboardController';
import { authorize } from '../middlewares/auth';

const router = Router();

router.get('/', authorize, getDashboardData);

export default router;
