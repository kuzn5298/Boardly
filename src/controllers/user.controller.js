import userService from '../services/user.service';

class UsersController {
  getUsers(req, res) {
    const { id } = req.params ?? {};
    const { success, data } = id
      ? userService.getUserById(id)
      : userService.getUsers();

    if (success) {
      res.send(data);
    } else {
      res.statusCode = 404;
      res.send({ message: 'Not found' });
    }
  }

  createUser(req, res) {
    const body = req.body;
    const { data } = userService.createUser(body);
    res.send(data);
  }

  deleteUser(req, res) {
    const { id } = req.params;
    const { status } = userService.deleteUser(id);
    res.send(status);
  }

  updateUser(req, res) {
    const body = req.body;
    const { data } = userService.updateUser(body);
    res.send(data);
  }
}

export default new UsersController();
