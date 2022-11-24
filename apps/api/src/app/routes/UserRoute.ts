import { Router } from 'express';

import { acceptTermsOfUse, getAllUsers, getUserProfile, watchOrientationVideo } from '../controllers/UserController';
import { authorize } from '../middlewares/auth';

const router = Router();

router.get('/profile', authorize, getUserProfile);

router.put('/accept-terms-of-use', authorize, acceptTermsOfUse);

router.put('/watch-orientation-video', authorize, watchOrientationVideo);

// TODO - update middleware to autorize web user
router.get('/', getAllUsers);

export default router;
