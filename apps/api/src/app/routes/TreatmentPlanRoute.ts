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
  getTreatmentPlanById,
  getTreatmentPlanDetails,
  updateTreatmentPlanDetails,
  uploadTreatmentVideo,
} from '../controllers/TreatmentPlanController';
import { authorize, authorizeWebUser } from '../middlewares/auth';
import { validateCreateFeedback } from '../validations/FeedbackValidation';
import { uploadTreatmentTypeVideo } from '../middlewares/azureStorage';
import { validateTreatmentPlanData } from '../validations/validation';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/upload', authorize, upload.single('file'), uploadTreatmentPlan);

router.get('/tasks/date/:date', authorize, getTasksByDate);

router.put('/task/:task_id/status/:status', authorize, updateTask);

router.post('/task/:task_id/feedback', authorize, validateCreateFeedback, postTaskFeedback);

router.get('/task/:task_id/feedback', authorize, getTaskFeedback);

router.put('/tasks/date/:date/skip', authorize, skipUserTasks);

router.get('/web', authorizeWebUser, getAllTreatmentPlans);

router.get('/:id/web', authorizeWebUser, getTreatmentPlanById);

router.get('/tasks/:user_id/web', authorizeWebUser, getSkippedAndCompletedTasks);

router.get('/:id', authorizeWebUser, getTreatmentPlanDetails);

router.post('/video/upload', uploadTreatmentTypeVideo.single('video'), authorizeWebUser, uploadTreatmentVideo);

router.put(
  '/tp_day/:tp_day/tp_id/:tp_id/update',
  authorizeWebUser,
  validateTreatmentPlanData,
  updateTreatmentPlanDetails
);

export default router;
