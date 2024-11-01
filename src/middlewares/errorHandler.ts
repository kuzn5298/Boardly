import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors';
import { logger } from '@/utils';

export const errorHandler = (
  err: ApiError | unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err instanceof ApiError ? err : ApiError.UnknownError();

  if (!(err instanceof ApiError)) {
    logger.error(err);
  }

  return res
    .status(error.status)
    .json({ message: error.message, errors: error.errors });
};
