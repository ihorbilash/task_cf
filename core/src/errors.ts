import {
  ExpressInstance,
  ExpressRequest,
  ExpressResponse,
  ExpressNextFunction,
} from '@monorepo/core/src/api-server.js';

export function registerErrorHandler(app: ExpressInstance) {
  app.use((err: any, req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  });
}
