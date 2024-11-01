import { UserDTO } from '@/dto';
import { User } from '@/models';
import AppDataSource from '@/ormconfig';
import { validateOrError } from '@/utils';

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (): Promise<UserDTO[]> => {
  const users = await userRepository.find();
  return users.map((user) => new UserDTO(user));
};

export const createUser = async (data: Partial<User>): Promise<UserDTO> => {
  const user = userRepository.create(data);
  await validateOrError(user);
  await userRepository.save(user);
  return new UserDTO(user);
};

export const getUserById = async (id: string): Promise<UserDTO | null> => {
  const user = await userRepository.findOneBy({ id });
  return user && new UserDTO(user);
};

export const deleteUser = async (id: string): Promise<UserDTO | null> => {
  const user = await userRepository.findOneBy({ id });
  return user && new UserDTO(user);
};

export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    return null;
  }
  const { createdAt, updatedAt, ...userData } = data;

  userRepository.merge(user, userData);
  await validateOrError(user);
  return await userRepository.save(user);
};
