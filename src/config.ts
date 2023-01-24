import tsEnv from '@lpgera/ts-env';

type Config = {
  env: string;
  app: {
    name: string;
    port: number;
  };
};

export const config: Config = {
  env: tsEnv.string('NODE_ENV') || 'production',
  app: {
    name: tsEnv.string('APP_NAME') || 'social-analytics',
    port: tsEnv.number('APP_PORT') || 8080,
  },
};
