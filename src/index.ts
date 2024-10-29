import { connectDB } from './config/db';
import { config } from './config/env';
import { app } from './server';

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server started on PORT ${config.port}`);
  });
};

start();
