import { Request, Response } from 'express';
import { userService } from '@/services';
import { asyncHandler } from '@/middlewares';
import { ApiError } from '@/errors';

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw ApiError.NotFound('User not found');
  }
  res.status(200).json(user);
});
