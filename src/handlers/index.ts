import express, { Router } from 'express';
import bodyParser from 'body-parser';

export const router = (): Router => {
  const router = express.Router();
  router.use(bodyParser.json());

  router.get('/ping', (_req, res) => {
    res.status(200).send('pong');
  });

  return router;
};
