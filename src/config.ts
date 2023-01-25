import tsEnv from '@lpgera/ts-env';
import type { Config } from './types';

export const config: Config = {
  env: tsEnv.string('NODE_ENV') || 'production',
  app: {
    name: tsEnv.string('APP_NAME') || 'social-analytics',
    port: tsEnv.number('APP_PORT') || 8080,
  },
  db: {
    user: tsEnv.string('DB_USER') || 'postgres',
    pass: tsEnv.string('DB_PASS') || 'postgres',
    name: tsEnv.string('DB_NAME') || 'social-analytics',
    port: tsEnv.number('DB_PORT') || 5432,
    host: tsEnv.string('DB_HOST') || 'localhost',
  },
};
