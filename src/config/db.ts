import 'reflect-metadata';
import { AppDataSource } from './orm';
import { logger } from '@/utils';

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Database connected');
  } catch (error) {
    logger.error('Error connecting to Database:', error);
    process.exit(1);
  }
};
