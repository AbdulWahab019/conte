import * as express from 'express';
import * as multer from 'multer';

import * as TreatmentPlanController from '../controllers/TreatmentPlanController';
import { authorize } from '../middlewares/auth';
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/upload', authorize, upload.single('file'), TreatmentPlanController.uploadTreatmentPlan);

export default router;
