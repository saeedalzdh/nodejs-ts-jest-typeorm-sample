export type Config = {
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
