const { environment: env } = process.env.NODE_ENV === 'development' && require('../environments/environment');

export const environment = {
  production: process.env.production || env.production,
  PORT: process.env.PORT || env.PORT,

  SQL_PORT: process.env.SQL_PORT || env.SQL_PORT,
  SQL_USERNAME: process.env.SQL_USERNAME || env.SQL_USERNAME,
  SQL_PASSWORD: process.env.SQL_PASSWORD || env.SQL_PASSWORD,
  SQL_SERVER: process.env.SQL_SERVER || env.SQL_SERVER,
  SQL_DATABASE: process.env.SQL_DATABASE || env.SQL_DATABASE,

  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || env.STRIPE_WEBHOOK_SECRET,

  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || env.JWT_TOKEN_SECRET,

  SENTRY_DSN: process.env.SENTRY_DSN || env.SENTRY_DSN,
  SENTRY_RELEASE: process.env.SENTRY_RELEASE || env.SENTRY_RELEASE,

  AZURE_STORAGE_ACCESS_KEY: process.env.AZURE_STORAGE_ACCESS_KEY || env.AZURE_STORAGE_ACCESS_KEY,
  AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING || env.AZURE_STORAGE_CONNECTION_STRING,
  AZURE_STORAGE_ACCOUNT_NAME: process.env.AZURE_STORAGE_ACCOUNT_NAME || env.AZURE_STORAGE_ACCOUNT_NAME,

  ENV: process.env.ENV || env.ENV,
};
