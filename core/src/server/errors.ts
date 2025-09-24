import {
  ExpressInstance,
  ExpressRequest,
  ExpressResponse,
  ExpressNextFunction,
} from '@monorepo/core/src/server/api-server.js';
import { logger } from '@monorepo/core/src/logger.js';

export function registerErrorHandler(app: ExpressInstance) {
  app.use((err: any, req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
    logger.error(err);
    res.status(500).json({ message: `${err.message}` });
  });
}
