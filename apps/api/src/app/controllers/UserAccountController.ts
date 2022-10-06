import { sendResponse } from '../utils/appUtils';
import { createUserAccount, loginUser } from '../services/UserAccountService';

async function createAccount(req, res) {
  const { email, password } = req.body;

  const apiResp = await createUserAccount(email, password);
  return sendResponse(res, 200, 'Success', apiResp);
}

async function accountLogin(req, res) {
  const { email, password } = req.body;

  const apiResp = await loginUser(email, password);

  return sendResponse(res, 201, 'Authenticated', apiResp);
}

export { createAccount, accountLogin };
