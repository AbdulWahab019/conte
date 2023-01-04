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
  getUserTasksReport,
  getTreatmentPlanById,
  getTreatmentPlanDetails,
  updateTreatmentPlanDetails,
  uploadTreatmentVideo,
  uploadTreatmentPlanWeb,
} from '../controllers/TreatmentPlanController';
import { authorize, authorizeWebUser } from '../middlewares/auth';
import { validateCreateFeedback } from '../validations/FeedbackValidation';
import { uploadTreatmentTypeVideo } from '../middlewares/azureStorage';
import { validateTreatmentPlanData, validateTreatmentPlanDataWeb } from '../validations/TreatmentPlanValidation';

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

router.get('/user/:user_id/tasks/web', authorizeWebUser, getUserTasksReport);

router.get('/:id', authorizeWebUser, getTreatmentPlanDetails);

router.post('/video/upload', authorizeWebUser, uploadTreatmentTypeVideo.single('video'), uploadTreatmentVideo);

router.put('/tp_day/:tp_day/tp_id/:tp_id', validateTreatmentPlanData, authorizeWebUser, updateTreatmentPlanDetails);

router.post('/upload/web', validateTreatmentPlanDataWeb, authorizeWebUser, uploadTreatmentPlanWeb);

export default router;
