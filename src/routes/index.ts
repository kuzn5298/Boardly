import { Application } from 'express';
import userRoutes from './userRoutes';

export const setupRoutes = (app: Application) => {
  app.use('/api/users', userRoutes);
};
