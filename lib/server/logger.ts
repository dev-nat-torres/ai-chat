import { join } from 'path';
import { pino } from 'pino';

import { env } from '@/lib/server/env';

const LOGS_DIR = join(process.cwd(), 'storage', 'logs');
const ERROR_LOGS_DIR = join(LOGS_DIR, 'error');
const LOG_FILE_NAME = (type: 'info' | 'error') =>
  `${type === 'info' ? LOGS_DIR : ERROR_LOGS_DIR}-${new Date().toISOString().split('T')[0]}.log`;

export const logger = pino(
  env.isDev
    ? {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: false,
            colorize: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
            ignore: 'pid,hostname',
          },
        },
      }
    : {
        level: 'info',
        transport: {
          targets: [
            {
              level: 'info',
              target: 'pino/file',
              options: {
                mkdir: true,
                destination: LOG_FILE_NAME('info'),
              },
            },
            {
              level: 'error',
              target: 'pino/file',
              options: {
                mkdir: true,
                destination: LOG_FILE_NAME('error'),
              },
            },
            {
              level: 'info',
              target: 'pino/file',
              options: {
                destination: 1,
              },
            },
          ],
        },
      },
);

export const createLogger = (context: string) => logger.child({ context });
