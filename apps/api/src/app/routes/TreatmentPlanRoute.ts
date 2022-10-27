import multer = require('multer');
import { Router } from 'express';

import { uploadTreatmentPlan, getTaskByDate, updateCompletedTask } from '../controllers/TreatmentPlanController';
import { authorize } from '../middlewares/auth';
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/upload', authorize, upload.single('file'), uploadTreatmentPlan);

router.get('/tasks', authorize, getTaskByDate);

router.post('/update', authorize, updateCompletedTask);

export default router;
