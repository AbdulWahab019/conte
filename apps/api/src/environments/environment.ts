export const environment = {
  production: false,

  PORT: 8081,
  APPLICATION_ID: 'poc-user',

  SQL_PORT: 1433,
  SQL_USERNAME: 'poc-user',
  SQL_PASSWORD: '123456',
  SQL_SERVER: 'localhost',
  SQL_DATABASE: 'simple-poc',

  STRIPE_PUBLISHABLE_KEY:
    'pk_test_51JRod3DYXkLuaaiolewBKjD3yXdn3BUZKwPHkcaE5x30OGC34nFYasfRdb0js9iwCwRZf55TkmzXx0MbC6fLwMTY00kBPlpuz6',
  STRIPE_SECRET_KEY:
    'sk_test_51JRod3DYXkLuaaioU4suQilEcLyPCkblile7iymvv6mm5p0pKTewZjOpGfWjwzaPYwB0n4Mm0AfoHluLJkTeTYyp00S9CpZaYm',

  JWT_TOKEN_SECRET:
    'e051f39167b2e7f6674f9ade69d2e10927b89cfc52b024e2705b29f847eb06fb38d1274904143291bca0ac6f44ea34ac7dd54923251e93e0b8062f184c1a114b',

  ENV: 'dev',
};
