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
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || env.JWT_TOKEN_SECRET,

  ENV: process.env.ENV || env.ENV,
};
