import { Router } from 'express';

import { accountLogin, createAccount, createWebAccount, webAccountLogin } from '../controllers/AuthController';
import { validateLogin, validateRegisterAccount } from '../validations/AuthValidation';

const router = Router();

router.post('/register', validateRegisterAccount, createAccount);

router.post('/login', validateLogin, accountLogin);

router.post('/register/web', validateRegisterAccount, createWebAccount);

router.post('/login/web', validateLogin, webAccountLogin);
export default router;
