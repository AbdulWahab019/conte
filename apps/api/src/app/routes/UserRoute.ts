import { Router } from 'express';

import {
  acceptTermsOfUse,
  createUserTreatmentPlanTasks,
  getAllUsers,
  getUserProfile,
  getUserTreatmentPlanDetails,
  reAssignUserTask,
  renderUserTreatmentPlanDetails,
  updateUserTPTask,
  updateUserTreatmentPlanDetails,
  watchOrientationVideo,
} from '../controllers/UserController';
import { authorize, authorizeWebUser } from '../middlewares/auth';
import {
  validateTaskUpdate,
  validateUserTaskCreate,
  validateUserTreatmentPlanUpdate,
} from '../validations/UserValidation';

const router = Router();

router.get('/profile', authorize, getUserProfile);

router.put('/accept-terms-of-use', authorize, acceptTermsOfUse);

router.put('/watch-orientation-video', authorize, watchOrientationVideo);

router.get('/web', authorizeWebUser, getAllUsers);

router.get('/:user_id/web', authorizeWebUser, getUserTreatmentPlanDetails);

router.put('/:user_id/task/:task_id/web', validateTaskUpdate, authorizeWebUser, updateUserTPTask);

router.get('/:user_id/treatment-plan/export-csv', authorizeWebUser, renderUserTreatmentPlanDetails);

router.post(
  '/:user_id/user-treatment-plan/:user_tp_id',
  validateUserTaskCreate,
  authorizeWebUser,
  createUserTreatmentPlanTasks
);

router.put(
  '/user-treatment-plan/:user_tp_id/detail/:id',
  validateUserTreatmentPlanUpdate,
  authorizeWebUser,
  updateUserTreatmentPlanDetails
);

router.post('/user-treatment-plan/:user_tp_id/reassign-tasks', authorizeWebUser, reAssignUserTask);

export default router;
