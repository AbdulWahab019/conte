import multer = require('multer');
import { Router } from 'express';

import { uploadTreatmentPlan, getTasksByDate, completeTask } from '../controllers/TreatmentPlanController';
import { authorize } from '../middlewares/auth';
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/upload', authorize, upload.single('file'), uploadTreatmentPlan);

router.get('/tasks/date/:date', authorize, getTasksByDate);

router.post('/task/:task_id/complete', authorize, completeTask);

export default router;
