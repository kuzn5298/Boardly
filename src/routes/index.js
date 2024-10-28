import { usersRoutes } from './user.routes';

export const initRoutes = (router) => {
  usersRoutes('/user', router);
};
