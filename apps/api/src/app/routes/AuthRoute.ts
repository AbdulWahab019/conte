import { Router } from 'express';

import { accountLogin, createAccount } from '../controllers/AuthController';
import { validateLogin, validateRegisterAccount } from '../validations/AuthValidation';

const router = Router();

router.post('/register', validateRegisterAccount, createAccount);

router.post('/login', validateLogin, accountLogin);

export default router;
