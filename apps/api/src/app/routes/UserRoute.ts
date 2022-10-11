import * as express from 'express';
import { body } from 'express-validator';

import { accountLogin, createAccount } from '../controllers/UserController';
import { validate, validateConfirmPassword } from '../middlewares/validation';
import { EMAIL_REQUIRED, INVALID_PASSWORD_LENGTH, PASSWORD_REQUIRED } from '../utils/constants';

const router = express.Router();

router.post(
  '/',
  body('email').notEmpty().withMessage(EMAIL_REQUIRED),
  body('password').notEmpty().withMessage(PASSWORD_REQUIRED).isLength({ min: 8 }).withMessage(INVALID_PASSWORD_LENGTH),
  body('confirm_password').custom(validateConfirmPassword),
  validate,
  createAccount
);

router.post(
  '/login',
  body('email').notEmpty().withMessage(EMAIL_REQUIRED),
  body('password').notEmpty().withMessage(PASSWORD_REQUIRED),
  validate,
  accountLogin
);

export default router;
