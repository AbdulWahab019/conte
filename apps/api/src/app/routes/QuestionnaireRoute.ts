import { Router } from 'express';
const router = Router();

import { createQuestionnaire, submitQuestionnaire } from '../controllers/QuestionnaireController';
import { authorize } from '../middlewares/auth';
import { validateCreateQuestionnaire, validateSubmitQuestionnaire } from '../validations/QuestionnaireValidation';

router.post('/', validateCreateQuestionnaire, authorize, createQuestionnaire);

router.post('/submit', validateSubmitQuestionnaire, authorize, submitQuestionnaire);

export default router;
