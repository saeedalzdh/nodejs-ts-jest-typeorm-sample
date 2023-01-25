import type { Request, RequestHandler } from 'express';
import Joi, { ValidationResult } from 'joi';

const ValidateQuery = <T>(req: Request): ValidationResult<T> => {
  const schema = Joi.object({
    page: Joi.number().min(1).max(10).required(),
  });

  return schema.validate(req.query);
};

export const userPostsHandler: RequestHandler = async (req, res) => {
  const validationResult = ValidateQuery<{ page: number }>(req);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.message,
    });
  }

  const page: number = validationResult.value.page;

  // TODO::return posts by pagination

  try {
    return res.status(200).json({ page, posts: [] });
  } catch (error) {
    return res.status(400);
  }
};
