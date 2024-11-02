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
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET ?? '',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET ?? '',
    accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '',
  },
};
