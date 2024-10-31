import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT ?? 5000,
  db: {
    host: process.env.POSTGRES_HOST ?? '',
    port: parseFloat(process.env.POSTGRES_PORT ?? ''),
    username: process.env.POSTGRES_USER ?? '',
    password: process.env.POSTGRES_PASSWORD ?? '',
    database: process.env.POSTGRES_DB ?? '',
  },
};
