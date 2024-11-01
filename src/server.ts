import express, { Application } from 'express';
import { setupRoutes } from './routes';
import { setupSwagger } from './swagger';
import { errorHandler } from './middlewares';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);
setupRoutes(app);

app.use(errorHandler);

export { app };
