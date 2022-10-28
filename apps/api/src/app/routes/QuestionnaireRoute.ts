import { Router } from 'express';
const router = Router();

import { createQuestionnaireHttpReq, submitQuestionnaireHttpReq } from '../controllers/QuestionnaireController';
import { authorize } from '../middlewares/auth';
import { validateCreateQuestionnaire, validateSubmitQuestionnaire } from '../validations/QuestionnaireValidation';

router.post('/', validateCreateQuestionnaire, authorize, createQuestionnaireHttpReq);

router.post('/submit', validateSubmitQuestionnaire, authorize, submitQuestionnaireHttpReq);

export default router;
