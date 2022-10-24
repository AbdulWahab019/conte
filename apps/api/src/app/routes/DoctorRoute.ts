import { Router } from 'express';
const router = Router();

import { getAllDoctors } from '../controllers/DoctorController';
import { authorize } from '../middlewares/auth';

router.get('/', authorize, getAllDoctors);

export default router;
