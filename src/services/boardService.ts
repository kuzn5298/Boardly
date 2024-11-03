import { AppDataSource } from '@/config/orm';
import { Board, User } from '@/entities';
import { ApiError } from '@/errors';
import { validateOrError } from '@/utils';
import { BoardDTO } from '@/dto';
import { userService } from '.';

const userRepository = AppDataSource.getRepository(User);
const boardRepository = AppDataSource.getRepository(Board);

export const createBoard = async (
  name: string,
  ownerId: string
): Promise<BoardDTO> => {
  const owner = await userService.getUserById(ownerId);
  if (!owner) throw ApiError.NotFound('User not found');

  const board = boardRepository.create({ name, owner });
  await validateOrError(board);
  await boardRepository.save(board);
  const boardDTO = new BoardDTO(board);

  return boardDTO;
};

export const getBoardsByUser = async (userId: string): Promise<BoardDTO[]> => {
  const boards = await boardRepository.find({
    where: [{ owner: { id: userId } }, { users: { id: userId } }],
  });

  const boardsDTO = boards.map((board) => new BoardDTO(board));

  return boardsDTO;
};

export const isBoardOwner = async (
  boardId: string,
  userId: string
): Promise<boolean> => {
  const board = await boardRepository.findOne({
    where: { id: boardId },
    relations: ['owner'],
  });

  return board?.owner.id === userId;
};

export const updateBoard = async (
  id: string,
  name: string
): Promise<BoardDTO | null> => {
  const board = await boardRepository.findOne({ where: { id } });
  if (!board) {
    throw ApiError.NotFound('Board not found');
  }

  board.name = name;
  await validateOrError(board);
  await boardRepository.save(board);

  return new BoardDTO(board);
};

export const deleteBoard = async (id: string): Promise<boolean> => {
  const result = await boardRepository.delete(id);
  return !!result.affected;
};

export const addUserToBoard = async (
  boardId: string,
  userId: string
): Promise<BoardDTO | null> => {
  const board = await boardRepository.findOne({
    where: { id: boardId },
    relations: ['users'],
  });

  const user = await userRepository.findOneBy({ id: userId });
  if (board && user) {
    board.users.push(user);
    await boardRepository.save(board);
    const boardDTO = new BoardDTO(board);
    console.log('boardDTO', boardDTO);
    return boardDTO;
  }
  return null;
};

export const removeUserFromBoard = async (
  boardId: string,
  userId: string
): Promise<boolean> => {
  const board = await boardRepository.findOne({
    where: { id: boardId },
    relations: ['users'],
  });

  if (board) {
    board.users = board.users.filter((user) => user.id !== userId);
    await boardRepository.save(board);
    return true;
  }
  return false;
};
