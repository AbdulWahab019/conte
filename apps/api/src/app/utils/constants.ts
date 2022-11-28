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
export const USER_NOT_VERIFIED = 'User not verified';

// User
export const USER_EXISTS = 'User already exists';
export const USER_NOT_FOUND = 'User not found';
export const USER_DEMOGRAPHICS_INVALID = 'User Demographics is invalid.';
export const FIRST_NAME_REQUIRED = 'First Name is required';
export const FIRST_NAME_LENGTH_INVALID = 'First Name should be between 2 and 20 letters.';
export const LAST_NAME_REQUIRED = 'Last Name is required';
export const LAST_NAME_LENGTH_INVALID = 'Last Name should be between 2 and 20 letters.';
export const USER_PHONE_INVALID = 'Invalid Phone Number';
export const USER_BIRTH_DATE_INVALID = 'Invalid Date of Birth';
export const USER_ADDRESS_INVALID = 'Invalid Address';
export const USER_CITY_INVALID = 'Invalid City';
export const USER_STATE_INVALID = 'Invalid State';
export const USER_ZIP_CODE_INVALID = 'Invalid US Zip Code';
export const USER_ESTIMATED_MAX_VELOCITY_INVALID = 'Invalid Estimated Max Velocity';

// Subscription
export const SUBSCRIPTION_REQUIRED = 'Subscription_id is required.';
export const INVALID_SUBSCRIPTION_ID_LENGTH = 'Subscription_id should be 28 digits.';
export const SUCCESS_URL_REQUIRED = 'Success Url is required';
export const CANCEL_URL_REQUIRED = 'Cancel Url is required';

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
export const TREATMENT_PLAN_ALREADY_ASSIGNED = 'A Treatment Plan is already assigned to user';
export const TREATMENT_PLAN_NOT_ASSIGNED = 'No Treatment Plan assigned to user';

// Task Feedback
export const TASK_ID_REQUIRED = 'Task id is required';
export const QUESTION_REQUIRED = 'Question is required';
export const FEEDBACK_REQUIRED = 'Feedback is required';
export const TYPE_REQUIRED = 'Task type is required';

// Tasks
export const NO_TASKS_EXIST = 'No tasks exist for today';
