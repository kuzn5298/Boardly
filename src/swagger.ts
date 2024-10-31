import path from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import { config } from './config/env';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API for managing users',
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
      },
    ],
  },
  apis: [
    path.resolve(__dirname, './routes/*.{ts,js}'),
    path.resolve(__dirname, './models/*.{ts,js}'),
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
