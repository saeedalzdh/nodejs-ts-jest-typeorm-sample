import type { Request, RequestHandler } from 'express';
import Joi, { ValidationResult } from 'joi';
import { postRepositoryImp } from '../dao/repositories/posts-repository';
import { getPostInsightsByUser } from '../domain/insights';
import type { PostInsightsByUser } from '../types';

const ValidateQuery = <T>(req: Request): ValidationResult<T> => {
  const schema = Joi.object({}).unknown();

  return schema.validate(req.query);
};

export const getInsightsHandler: RequestHandler = async (req, res) => {
  const validationResult = ValidateQuery<{}>(req);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.message,
    });
  }

  try {
    const posts = await postRepositoryImp.getAllPosts();
    const postInsights: PostInsightsByUser = getPostInsightsByUser(posts);

    return res.status(200).json({
      meta: {},
      data: {
        insights: postInsights,
      },
    });
  } catch (error) {
    return res.status(400);
  }
};
