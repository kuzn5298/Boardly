import { ApiError } from '@/errors';
import { tokenService } from '@/services';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw ApiError.Unauthorized();
    }

    const { userId } = tokenService.validateAccessToken(token) as JwtPayload;

    req.body.authUserId = userId;
  } catch {
    throw ApiError.Unauthorized();
  }
  next();
};
