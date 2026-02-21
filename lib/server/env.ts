import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  OPEN_ROUTER_API_KEY: str(),
});
