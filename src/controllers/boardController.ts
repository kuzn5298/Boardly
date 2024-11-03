import { Request, Response } from 'express';
import { ApiError } from '@/errors';
import { boardService } from '@/services';
import { asyncHandler } from '@/middlewares';

export const createBoard = asyncHandler(async (req: Request, res: Response) => {
  const { name, authUserId } = req.body;

  const board = await boardService.createBoard(name, authUserId);
  res.status(201).json(board);
});

export const getBoardsByUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { authUserId } = req.body;
    const boards = await boardService.getBoardsByUser(authUserId);
    res.status(200).json(boards);
  }
);

export const addUserToBoard = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, authUserId } = req.body;

    const isOwner = await boardService.isBoardOwner(id, authUserId);
    if (!isOwner) {
      throw ApiError.BadRequest(
        'You do not have permission to add user to this board'
      );
    }

    const board = await boardService.addUserToBoard(id, userId);
    if (board) {
      res.status(200).json(board);
    } else {
      throw ApiError.NotFound('Board or User not found');
    }
  }
);

export const updateBoard = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, authUserId } = req.body;

  const isOwner = await boardService.isBoardOwner(id, authUserId);
  if (!isOwner) {
    throw ApiError.BadRequest(
      'You do not have permission to update this board'
    );
  }

  const board = await boardService.updateBoard(id, name);
  res.status(200).json(board);
});

export const deleteBoard = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { authUserId } = req.body;

  const isOwner = await boardService.isBoardOwner(id, authUserId);
  if (!isOwner) {
    throw ApiError.BadRequest(
      'You do not have permission to delete this board'
    );
  }

  const success = await boardService.deleteBoard(id);
  if (success) {
    res.status(200).json({ message: 'Board deleted successfully' });
  } else {
    throw ApiError.NotFound('Board not found');
  }
});

export const removeUserFromBoard = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, userId } = req.params;
    const { authUserId } = req.body;

    const isOwner = await boardService.isBoardOwner(id, authUserId);
    if (!isOwner) {
      throw ApiError.BadRequest(
        'You do not have permission to remove user from this board'
      );
    }

    const success = await boardService.removeUserFromBoard(id, userId);
    if (success) {
      res.status(200).json({ message: 'User removed from board successfully' });
    } else {
      throw ApiError.NotFound('Board or User not found');
    }
  }
);
