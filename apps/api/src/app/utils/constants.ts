// Responses
export const SUCCESS = 'Success';
export const BAD_REQUEST = 'Bad Request';
export const INTERNAL_SERVER_ERROR = 'Internal Server Error';
export const SOMETHING_WENT_WRONG = 'Something went wrong';

// Generic
export const ACTIVE = 'active';

// Auth
export const INVALID_CREDENTIALS = 'Invalid credentials';
export const AUTHENTICATED = 'Authenticated';
export const AUTHENTICATION_FAILED = 'Authentication Failed';
export const UNAUTHORIZED = 'Unauthorized';
export const CONFIRM_PASSWORD_NOT_SAME = 'Password and confirm password should be same';
export const INVALID_EMAIL = 'Invalid Email';
export const EMAIL_REQUIRED = 'Email is required.';
export const PASSWORD_REQUIRED = 'Password is required.';
export const INVALID_PASSWORD_LENGTH = 'Password length must be 8 or more characters';

// User
export const USER_EXISTS = 'User already exists';
export const USER_NOT_FOUND = 'User not found';

// Subscription
export const SUBSCRIPTION_REQUIRED = 'Subscription_id is required.';
export const INVALID_SUBSCRIPTION_ID_LENGTH = 'Subscription_id should be 28 digits.';

// Questionnaire
export const DATA_NOT_ARRAY = 'Data must be an array';
export const QUESTION_ID_NOT_INTEGER = 'Question Id must be an integer';
export const QUESTION_ID_EMPTY = 'Question Id must not be empty';
export const QUESTION_RESPONSE_EMPTY = 'Question response must not be empty';
