import { Application } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

export const setupRoutes = (app: Application) => {
  app.use('/api/users', userRoutes);
  app.use('/api', authRoutes);
};
