import { pino } from 'pino';

export const logger = pino({
  name: 'express',
  level: process.env.LOG_LEVEL || 'info',
  base: undefined,
  formatters: {
    level: (label: string) => ({ level: label.toUpperCase() }),
  },
});
