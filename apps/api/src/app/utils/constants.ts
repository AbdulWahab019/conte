// Responses
export const SUCCESS = 'Success';
export const BAD_REQUEST = 'Bad Request';
export const INTERNAL_SERVER_ERROR = 'Internal Server Error';
export const SOMETHING_WENT_WRONG = 'Something went wrong';

// Generic
export const ACTIVE = 'active';

// Errors
export const SEQUELIZE_UNIQUE_CONSTRAINT_ERROR = 'SequelizeUniqueConstraintError';

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

// Doctor
export const DOCTOR_NOT_FOUND = 'Doctor not found';
export const DOCTOR_EXISTS = 'Doctor already exists';
export const DOCTOR_ID_NOT_INTEGER = 'Doctor Id must be an integer';
export const DOCTOR_ID_EMPTY = 'Doctor Id must not be empty';

// Surgery
export const SURGERY_NOT_FOUND = 'Surgery not found';
export const SURGERY_EXISTS = 'Surgery already exists';
export const SURGERY_ID_NOT_INTEGER = 'Surgery Id must be an integer';
export const SURGERY_ID_EMPTY = 'Surgery Id must not be empty';

// Treatment Plan
export const TREATMENT_PLAN_NOT_FOUND = 'Treatment Plan not found';
export const TREATMENT_PLAN_EXISTS = 'Treatment Plan already exists';
export const TREATMENT_PLAN_NAME_INVALID = 'Treatment plan name should be a valid string';
export const TREATMENT_PLAN_NAME_INVALID_LENGTH =
  'Treatment plan name should be greater than 5 characters and less than 30 characters';
export const TREATMENT_PLAN_ALREADY_ASSIGNED = 'This Treatment Plan is already assigned to user';
