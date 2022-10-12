import * as express from 'express';

import { acceptTermsOfUse, watchOrientationVideo } from '../controllers/UserController';
import { authorize } from '../middlewares/auth';

const router = express.Router();

router.put('/accept-terms-of-use', authorize, acceptTermsOfUse);

router.put('/watch-orientation-video', authorize, watchOrientationVideo);

export default router;
