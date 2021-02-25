require('dotenv/config');

interface envVars {
  readonly dbUrl: string;
  readonly jwtSecret: string;
}

function checkEnv(envVar: string | undefined, option: string): void {
  if (envVar === '') {
    throw new Error(`${option} was not set in the .env file`);
  }
}

const url = process.env.DB_URL || '';
const secret = process.env.JWT_SECRET || '';

try {
  checkEnv(url, 'DB_URL');
  checkEnv(secret, 'JWT_SECRET');
} catch (e) {
  process.exit(-1);
}

const options: envVars = {
  dbUrl: url,
  jwtSecret: secret,
};

export default options;
