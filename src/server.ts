import express, { Application } from 'express';
import Routes from './routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

new Routes(app);

export { app };
