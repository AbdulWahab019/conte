import multer = require('multer');
import { Router } from 'express';

import {
  uploadTreatmentPlan,
  getTasksByDate,
  updateTask,
  postTaskFeedback,
  getTaskeedback,
} from '../controllers/TreatmentPlanController';
import { authorize } from '../middlewares/auth';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/upload', authorize, upload.single('file'), uploadTreatmentPlan);

router.get('/tasks/date/:date', authorize, getTasksByDate);

router.put('/task/:task_id/status/:status', authorize, updateTask);

router.post('/task/:task_id/feedback', authorize, postTaskFeedback);

router.get('/task/:task_id/feedback', authorize, getTaskeedback);

export default router;
