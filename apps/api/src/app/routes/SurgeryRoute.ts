import { Router } from 'express';
const router = Router();

import { getAllSurgeriesByDoctor } from '../controllers/SurgeryController';
import { authorize } from '../middlewares/auth';
import { validateSurgeriesByDoctor } from '../validations/SurgeryValidation';

router.get('/doctor/:doctor_id', validateSurgeriesByDoctor, authorize, getAllSurgeriesByDoctor);

export default router;
