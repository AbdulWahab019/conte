import { Router } from 'express';

import { acceptTermsOfUse, getUserProfile, watchOrientationVideo } from '../controllers/UserController';
import { authorize } from '../middlewares/auth';

const router = Router();

router.get('/profile', authorize, getUserProfile);

router.put('/accept-terms-of-use', authorize, acceptTermsOfUse);

router.put('/watch-orientation-video', authorize, watchOrientationVideo);

export default router;
