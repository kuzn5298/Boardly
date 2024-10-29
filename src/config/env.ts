import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT ?? 5000,
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseFloat(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? '',
  },
};
