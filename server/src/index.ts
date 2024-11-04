import { connectDB } from './config/db';
import { config } from './config/env';
import { app } from './server';
import { logger } from './utils';

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    logger.info(`Server started on PORT ${config.port}`);
  });
};

start();
