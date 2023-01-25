import express, { Express } from 'express';
import { router } from './handlers';

export const createHttpServer = (): Express => {
  const app = express();

  app.use(router());

  return app;
};
