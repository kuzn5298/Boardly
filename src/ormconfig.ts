import { DataSource } from 'typeorm';
import { User } from '@/models';
import { config } from '@/config/env';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [User],
  synchronize: true,
});

export default AppDataSource;
