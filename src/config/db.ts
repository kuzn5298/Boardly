import mongoose from 'mongoose';
import { config } from './env';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
