import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  GEMINI_API_KEY: str(),
  GEMINI_MODEL: str(),
  DATABASE_URL: str(),
  SHADOW_DATABASE_URL: str(),
});
