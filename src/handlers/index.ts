import express, { Router } from 'express';
import bodyParser from 'body-parser';

export const router = (): Router => {
  const router = express.Router();
  router.use(bodyParser.json());

  return router;
};
