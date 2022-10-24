import * as express from 'express';

import { acceptTermsOfUse, getUser, watchOrientationVideo } from '../controllers/UserController';
import { authorize } from '../middlewares/auth';

const router = express.Router();

router.get('/user-details', authorize, getUser);

router.put('/accept-terms-of-use', authorize, acceptTermsOfUse);

router.put('/watch-orientation-video', authorize, watchOrientationVideo);

export default router;
