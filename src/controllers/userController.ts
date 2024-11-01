import { Request, Response } from 'express';
import { userService } from '@/services';
import { asyncHandler } from '@/middlewares';
import { ApiError } from '@/errors';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw ApiError.NotFound('User not found');
  }
  res.status(200).json(user);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) {
    throw ApiError.NotFound('User not found');
  }
  res.status(200).json(user);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.deleteUser(req.params.id);
  if (!user) {
    throw ApiError.NotFound('User not found');
  }
  res.status(204).json({ message: 'User deleted successfully' });
});
