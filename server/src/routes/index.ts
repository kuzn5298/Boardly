import { Application } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import boardRoutes from './boardRoutes';

export const setupRoutes = (app: Application) => {
  app.use('/api/users', userRoutes);
  app.use('/api', authRoutes);
  app.use('/api/boards', boardRoutes);
};
