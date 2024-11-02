import { plainToInstance } from 'class-transformer';
import { UserDTO } from '@/dto';
import { User } from '@/entities';
import { AppDataSource } from '@/config/orm';
import { validateOrError } from '@/utils';

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (): Promise<UserDTO[]> => {
  const users = await userRepository.find();
  return users.map((user) => new UserDTO(user));
};

export const getUserById = async (id: string): Promise<UserDTO | null> => {
  const user = await userRepository.findOneBy({ id });
  return user && new UserDTO(user);
};
