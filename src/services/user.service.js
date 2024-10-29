import { getId } from '../libs/utils';
import { UserModel } from '../models';

class UserService {
  async getUsers() {
    try {
      const users = await UserModel.find();
      return { success: true, data: users };
    } catch (error) {
      return { success: false };
    }
  }

  async getUserById(id) {
    try {
      const user = await UserModel.findById(id);
      return { success: Boolean(user), data: user };
    } catch (error) {
      return { success: false };
    }
  }

  async createUser(data) {
    const id = getId();

    const newUser = {
      id,
      name: data.name ?? '',
    };

    const user = await UserModel.create(newUser);
    await user.save();

    return { success: true, data: user };
  }

  async deleteUser(id) {
    const user = await UserModel.findByIdAndDelete(id);
    return { success: Boolean(user), data: user };
  }

  async updateUser(data) {
    const { id, name } = data;

    try {
      const user = await UserModel.findByIdAndUpdate(id, { name });

      return { success: Boolean(user), data: user };
    } catch {
      return { success: false };
    }
  }
}

export default new UserService();
