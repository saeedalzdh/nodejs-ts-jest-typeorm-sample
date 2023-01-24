import tsEnv from '@lpgera/ts-env';

type Config = {
  env: string;
  app: {
    name: string;
    port: number;
  };
  db: {
    user: string;
    pass: string;
    name: string;
    port: number;
    host: string;
  };
};

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
