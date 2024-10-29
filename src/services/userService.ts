import { User } from '../models';
import { IUser } from '../interfaces';

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  return user;
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

export const updateUser = async (
  id: string,
  userData: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};
