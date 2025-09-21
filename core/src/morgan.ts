import morgan from 'morgan';
import { ExpressInstance } from '@monorepo/core/src/api-server.js';

export function registerMorgan(app: ExpressInstance, format: string) {
  app.use(morgan(format));
}
