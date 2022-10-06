import * as express from 'express';
const router = express.Router();
import {
  accountLogin,
  createAccount,
} from '../controllers/UserAccountController';
import { body } from 'express-validator';
import { validate } from '../middlewares/validation';

/**
 * @typedef CreateAccount
 * @property {UUID} email.required
 * @property {UUID} password.required
 * @property {UUID} confirmPassword.required
 */

/**
 * @typedef Login
 * @property {UUID} email.required
 * @property {UUID} password.required
 * @property {string | number} pin_code.required
 */

/**
 * @route POST /account
 * @summary Create Account
 * @group User Account
 * @param {CreateAccount.model} data.body.required
 * @returns {Success.model} - 200 - OK
 * @returns {Error.model} - 400 - Bad Request
 * @returns {Error.model} - 500 - Bad Request | Server Error
 */
router.post(
  '/',
  body('email').notEmpty().withMessage('Email is required.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password length must be 8 or more characters'),
  body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password and confirm password should be same');
    }
    return true;
  }),
  validate,
  createAccount
);

/**
 * @route POST /account/login
 * @summary Account Login
 * @group User Account
 * @param {Login.model} data.body.required
 * @returns {Success.model} - 200 - OK
 * @returns {Error.model} - 400 - Bad Request
 * @returns {Error.model} - 500 - Bad Request | Server Error
 */
router.post(
  '/login',
  body('email').notEmpty().withMessage('Email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
  validate,
  accountLogin
);

export default router;
