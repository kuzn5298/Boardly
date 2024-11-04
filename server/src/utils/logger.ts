import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack, ...data }) => {
      let log = `${timestamp} [${level}]: ${message}`;
      if (Object.keys(data).length) {
        log += `\n${JSON.stringify(data, null, 2)}`;
      }
      if (stack) {
        log += `\n${stack}`;
      }
      return log;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});
