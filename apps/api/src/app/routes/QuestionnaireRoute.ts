import * as express from 'express';
const router = express.Router();

import * as QuestionnaireController from '../controllers/QuestionnaireController';
import { authorize } from '../middlewares/auth';
import { validateCreateQuestionnaire } from '../validations/QuestionnaireValidation';

router.post('/', validateCreateQuestionnaire, authorize, QuestionnaireController.submitQuestionnaire);

export default router;
