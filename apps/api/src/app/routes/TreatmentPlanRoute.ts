import multer = require('multer');
import { Router } from 'express';

import {
  uploadTreatmentPlan,
  getTasksByDate,
  updateTask,
  postTaskFeedback,
  getTaskFeedback,
  skipUserTasks,
  getAllTreatmentPlans,
  getSkippedAndCompletedTasks,
} from '../controllers/TreatmentPlanController';
import { authorize, authorizeWebUser } from '../middlewares/auth';
import { validateCreateFeedback } from '../validations/FeedbackValidation';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/upload', authorize, upload.single('file'), uploadTreatmentPlan);

router.get('/tasks/date/:date', authorize, getTasksByDate);

router.put('/task/:task_id/status/:status', authorize, updateTask);

router.post('/task/:task_id/feedback', authorize, validateCreateFeedback, postTaskFeedback);

router.get('/task/:task_id/feedback', authorize, getTaskFeedback);

router.put('/tasks/date/:date/skip', authorize, skipUserTasks);

router.get('/web', authorizeWebUser, getAllTreatmentPlans);

router.get('/skipped-tasks/:user_id', authorizeWebUser, getSkippedAndCompletedTasks);

export default router;
