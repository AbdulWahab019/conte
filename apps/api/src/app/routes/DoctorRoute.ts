import * as express from 'express';
const router = express.Router();

import { getAllDoctors } from '../controllers/DoctorController';
import { authorize } from '../middlewares/auth';

router.get('/', authorize, getAllDoctors);

export default router;
