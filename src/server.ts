import express, { Express } from 'express';

export const createHttpServer = (): Express => {
  const app = express();

  app.get('/ping', (_req, res) => {
    res.status(200).send('pong');
  });

  return app;
};
