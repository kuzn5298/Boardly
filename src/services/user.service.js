import { localDB } from '../libs/db';
import { getId } from '../libs/utils';

class UserService {
  getUsers() {
    const users = localDB.getItem('users') ?? {};
    const userArr = Object.values(users);
    return { success: true, data: userArr };
  }

  getUserById(id) {
    const users = localDB.getItem('users') ?? {};
    const user = users[id];
    return { success: Boolean(user), data: user };
  }

  createUser(data) {
    const id = getId();

    const newUser = {
      id,
      name: data.name ?? '',
    };

    const users = localDB.getItem('users') ?? {};
    users[id] = newUser;
    localDB.setItem('users', users);

    return { success: true, data: newUser };
  }

  deleteUser(id) {
    const users = localDB.getItem('users') ?? {};
    delete users[id];
    localDB.setItem('users', users);
    return { success: true };
  }

  updateUser(data) {
    const { id, name } = data;
    const users = localDB.getItem('users') ?? {};
    const user = users[id];
    if (!user) {
      return { success: false };
    }
    const updatedUser = {
      ...user,
      name,
    };
    users[id] = updatedUser;
    localDB.setItem('users', users);
    return { success: true, data: updatedUser };
  }
}

export default new UserService();
