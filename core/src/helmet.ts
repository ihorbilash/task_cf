import helmet from 'helmet';
import { ExpressInstance } from '@monorepo/core/src/server/api-server.js';

export function registerHelmet(app: ExpressInstance) {
  app.use(helmet());
}
