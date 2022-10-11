import * as express from 'express';
import { body } from 'express-validator';

import { accountLogin, createAccount } from '../controllers/UserAccountController';
import { validate } from '../middlewares/validation';

const router = express.Router();

router.post(
  '/register',
  body('email').notEmpty().withMessage('Email is required.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password length must be 8 or more characters'),
  body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) throw new Error('Password and confirm password should be same');
    return true;
  }),
  validate,
  createAccount
);

router.post(
  '/login',
  body('email').notEmpty().withMessage('Email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
  validate,
  accountLogin
);

export default router;
