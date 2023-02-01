import express, { Router } from 'express';
import bodyParser from 'body-parser';

import { getPostsHandler } from './get-posts-handler';

export const router = (): Router => {
  const router = express.Router();
  router.use(bodyParser.json());

  router.get('/posts', getPostsHandler);

  return router;
};
