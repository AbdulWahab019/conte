import { Router } from 'express';

import {
  acceptTermsOfUse,
  getAllUsers,
  getUserProfile,
  getUserTreatmentPlanDetails,
  updateUserTPTask,
  watchOrientationVideo,
} from '../controllers/UserController';
import { authorize, authorizeWebUser } from '../middlewares/auth';
import { validateTaskUpdate } from '../validations/validation';

const router = Router();

router.get('/profile', authorize, getUserProfile);

router.put('/accept-terms-of-use', authorize, acceptTermsOfUse);

router.put('/watch-orientation-video', authorize, watchOrientationVideo);

router.get('/web', authorizeWebUser, getAllUsers);

router.get('/:user_id/web', authorizeWebUser, getUserTreatmentPlanDetails);

router.put('/:user_id/task/:task_id/update/web', authorizeWebUser, validateTaskUpdate, updateUserTPTask);

export default router;
