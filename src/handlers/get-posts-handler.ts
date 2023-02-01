import type { Request, RequestHandler } from 'express';
import Joi, { ValidationResult } from 'joi';
import { postRepositoryImp } from '../dao/repositories/posts-repository';

const ValidateQuery = <T>(req: Request): ValidationResult<T> => {
  const schema = Joi.object({
    page: Joi.number().min(1).max(10).required(),
  });

  return schema.validate(req.query);
};

export const getPostsHandler: RequestHandler = async (req, res) => {
  const validationResult = ValidateQuery<{ page: number }>(req);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.message,
    });
  }

  const page: number = validationResult.value.page;

  try {
    const posts = await postRepositoryImp.getPostByPage(page);

    return res.status(200).json({
      meta: {},
      data: {
        page,
        posts,
      },
    });
  } catch (error) {
    return res.status(400);
  }
};
