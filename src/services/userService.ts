import { User } from '@/models';
import AppDataSource from '@/ormconfig';
import { validateOrReject } from 'class-validator';

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (): Promise<User[]> => {
  const users = await userRepository.find();
  return users;
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  const user = userRepository.create(data);
  await validateOrReject(user);
  return await userRepository.save(user);
};

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await userRepository.findOneBy({ id });
  return user;
};

export const deleteUser = async (id: string): Promise<User | null> => {
  const user = await userRepository.findOneBy({ id });
  return user;
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
  await validateOrReject(user);
  return await userRepository.save(user);
};
