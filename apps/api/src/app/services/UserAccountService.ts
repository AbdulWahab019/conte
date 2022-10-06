import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserAccount } from '../models/UserAccount';
import { APIError } from '../utils/apiError';

async function createUserAccount(email, password) {
  const doesUserExists = await UserAccount.findOne({ where: { email } });
  if (doesUserExists) throw new APIError(400, 'User Already Exists', '', '');

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = (
    await UserAccount.create({
      email,
      password: encryptedPassword,
    })
  ).toJSON();

  // Create token
  const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: '2d',
  });
  console.log('user', user);
  console.log('token', token);

  return {
    user_id: user.id,
    email: user.email,
    token,
  };
}

async function loginUser(email, password) {
  const user = (await UserAccount.findOne({ where: { email } })).toJSON();

  if (!user) throw new APIError(400, 'No user found against email', '', '');

  if (password && password.length) {
    const pass_compare = (await bcrypt.compare(password, user.password)) && user.email === email;

    if (!pass_compare) throw new APIError(401, 'Invalid credentials', '', '');
  }

  const token = jwt.sign({ user_ids: user.id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: '2d',
  });

  return {
    user_id: user.id,
    email: user.email,
    token,
  };
}

export { createUserAccount, loginUser };
