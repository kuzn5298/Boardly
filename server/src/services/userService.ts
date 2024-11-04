import { plainToInstance } from 'class-transformer';
import { UserDTO } from '@/dto';
import { User } from '@/entities';
import { AppDataSource } from '@/config/orm';

const userRepository = AppDataSource.getRepository(User);

export const getUserById = async (id: string): Promise<UserDTO | null> => {
  const user = await userRepository.findOneBy({ id });
  return user && plainToInstance(UserDTO, user);
};
