import * as express from 'express';
const router = express.Router();

import { getSurgeriesForDoctor } from '../controllers/SurgeryController';
import { authorize } from '../middlewares/auth';
import { validateDoctor } from '../validations/SurgeryValidation';

router.get('/doctor/:doctor_id', authorize, validateDoctor, getSurgeriesForDoctor);

export default router;
