// Responses
export const SUCCESS = 'Success';
export const BAD_REQUEST = 'Bad Request';
export const INTERNAL_SERVER_ERROR = 'Internal Server Error';
export const SOMETHING_WENT_WRONG = 'Something went wrong';

// Generic
export const ACTIVE = 'active';
export const TRIAL_IN_PROGRESS = 'trialing';

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
export const FILE_NOT_UPLOADED = "File couldn't be uploaded due to an error";

// Task Feedback
export const TASK_ID_REQUIRED = 'Task id is required';
export const QUESTION_REQUIRED = 'Question is required';
export const FEEDBACK_REQUIRED = 'Feedback is required';
export const TYPE_REQUIRED = 'Task type is required';

// Tasks
export const NO_SKIPPED_TASKS = 'No tasks are skipped by the user';
export const DATA_NOT_OBJECT = 'Data must be an object';
export const TASK_TYPE_NUMBER = 'Task type must be a number ';
export const TITLE_STRING = 'Title must be a string';
export const IS_COMPLETED = 'Is Completed must be true or false';
export const IS_SKIPPED = 'Is Skipped must be true or false';

// Treatment Plan Update
export const TP_ID_NOT_UPDATE = 'TP Id cannot be updated';
export const TP_DAY_NOT_UPDATE = 'TP day cannot be updated';
export const TP_WEEKDAY_NOT_UPDATE = 'TP weekday cannot be updated';
export const WEEK_FROM_SX_NUMBER = 'Week from sx must be a number';
export const MONTH_FROM_SX_NUMBER = 'Month from sx must be a number';
export const WEEK_OF_THROWING_NUMBER = 'Week of throwing must be a number';
export const MONTH_OF_THROWING_NUMBER = 'Month of throwing must be a number';
export const PLYO_THROW_NUMBER = 'Plyo throw must be a number';
export const MAX_DISTANCE_NUMBER = 'Max distance must be a nuumber';
export const MAX_VELOCITY_NUMBER = 'Max velocity must be a number';
export const POST_MAX_DISTANCE_FLAT_GROUND_NUMBER = 'Flat ground must be a number';
export const POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_NUMBER = 'Flat ground velocity must be a number';
export const POST_MAX_DISTANCE_FLAT_GROUND_VELOCITY_ABSOLUTE = 'Flat ground velocity absolute must be a number';
export const POST_MAX_DISTANCE_FLAT_GROUND_PITCHES = 'Flat ground pitches must be a string';
export const BULLPEN = 'Bullpen must be a number';
export const BULLPEN_MAX_VELOCITY = ' Bullpen max velocity percent must be a number';
export const BULLPEN_MAX_VELOCITY_ABSOLUTE = 'Bullpen max velocity absolute must be a number';
export const BULLPEN_PITCHES = 'Bullpen pitches must be a string';
export const LIVE_SIMULATED_GAME = 'Live simulated game must be a number';
export const INNINGS = 'Innings must be a number';
export const VIDEO_URL = 'Video url must be a string';
