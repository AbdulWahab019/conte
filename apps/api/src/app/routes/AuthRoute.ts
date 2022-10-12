import * as express from 'express';

import { accountLogin, createAccount } from '../controllers/AuthController';
import { validateLogin, validateRegisterAccount } from '../validations/AuthValidation';

const router = express.Router();

router.post('/register', validateRegisterAccount, createAccount);

router.post('/login', validateLogin, accountLogin);

export default router;
