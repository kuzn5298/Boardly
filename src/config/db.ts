import 'reflect-metadata';
import AppDataSource from '@/ormconfig';

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to Database:', error);
    process.exit(1);
  }
};

export default AppDataSource;
