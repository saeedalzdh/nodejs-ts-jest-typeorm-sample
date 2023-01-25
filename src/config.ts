import tsEnv from '@lpgera/ts-env';
import type { Config } from './types';

export const config: Config = {
  env: tsEnv.string('NODE_ENV') || 'production',
  app: {
    name: tsEnv.string('APP_NAME') || 'social_insights',
    port: tsEnv.number('APP_PORT') || 8080,
  },
  db: {
    user: tsEnv.string('DB_USER') || 'postgres',
    pass: tsEnv.string('DB_PASS') || 'postgres',
    name: tsEnv.string('DB_NAME') || 'social_insights',
    port: tsEnv.number('DB_PORT') || 5432,
    host: tsEnv.string('DB_HOST') || 'localhost',
  },
  registration: {
    clientId: tsEnv.string('CLIENT_ID') || 'ju16a6m81mhid5ue1z3v2g0uh',
    clientName: tsEnv.string('CLIENT_NAME') || 'Saeed',
    clientEmail: tsEnv.string('CLIENT_EMAIL') || 'Saeed@example.com',
  },
};
