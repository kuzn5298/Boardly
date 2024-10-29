import express, { Application } from 'express';
import { setupRoutes } from './routes';
import { setupSwagger } from './swagger';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);
setupRoutes(app);

export { app };
