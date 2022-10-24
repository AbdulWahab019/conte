import multer = require('multer');
import { Router } from 'express';

import { uploadTreatmentPlan } from '../controllers/TreatmentPlanController';
import { authorize } from '../middlewares/auth';
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/upload', authorize, upload.single('file'), uploadTreatmentPlan);

export default router;
