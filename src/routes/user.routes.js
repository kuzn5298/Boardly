import userController from '../controllers/user.controller';

export const usersRoutes = (path, router) => {
  router
    .get(path, userController.getUsers)
    .post(path, userController.createUser)
    .delete(path, userController.deleteUser)
    .put(path, userController.updateUser);
};
