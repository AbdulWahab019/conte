import { Router } from 'express';

import {
  acceptTermsOfUse,
  getAllUsers,
  getUserProfile,
  getUserTreatmentPlanDetails,
  watchOrientationVideo,
} from '../controllers/UserController';
import { authorize, authorizeWebUser } from '../middlewares/auth';

const router = Router();

router.get('/profile', authorize, getUserProfile);

router.put('/accept-terms-of-use', authorize, acceptTermsOfUse);

router.put('/watch-orientation-video', authorize, watchOrientationVideo);

router.get('/web', authorizeWebUser, getAllUsers);

router.get('/:user_id/web', authorizeWebUser, getUserTreatmentPlanDetails);

export default router;
