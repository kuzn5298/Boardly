require('dotenv').config();

const port = process.env.PORT ?? 5002;

export default {
  PORT: port,
  BASE_URL: process.env.BASE_URL ?? `http://localhost:${port}`,
};
