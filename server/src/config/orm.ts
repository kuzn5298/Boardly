import { DataSource } from 'typeorm';
import { Board, RefreshToken, User } from '@/entities';
import { config } from './env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [User, RefreshToken, Board],
  synchronize: true,
});
