import userService from '../services/user.service';

class UsersController {
  async getUsers(req, res) {
    const { id } = req.params ?? {};
    const { success, data } = id
      ? await userService.getUserById(id)
      : await userService.getUsers();

    if (success) {
      res.send(data);
    } else {
      res.statusCode = 404;
      res.send({ message: 'Not found' });
    }
  }

  async createUser(req, res) {
    const body = req.body;
    const { data } = await userService.createUser(body);

    res.statusCode = 201;
    res.send(data);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const { success, data } = await userService.deleteUser(id);
    if (success) {
      res.send(data);
    } else {
      res.statusCode = 404;
      res.send({ message: 'Not found' });
    }
  }

  async updateUser(req, res) {
    const body = req.body;
    const { success, data } = await userService.updateUser(body);
    if (success) {
      res.send(data);
    } else {
      res.statusCode = 404;
      res.send({ message: 'Not found' });
    }
  }
}

export default new UsersController();
