import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors';

export const errorHandler = (
  err: ApiError | unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const error = err instanceof ApiError ? err : ApiError.UnknownError();

  return res
    .status(error.status)
    .json({ message: error.message, errors: error.errors });
};
