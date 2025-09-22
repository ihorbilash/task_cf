import { ExpressRoute, ExpressRequest, ExpressResponse, router } from '@monorepo/core/src/server/api-server.js';

export function createServerStatusRouter(): ExpressRoute {
  function handleGetServerStatus(_req: ExpressRequest, res: ExpressResponse) {
    res.status(200).json({ status: 'ok' });
  }

  router.get('/', handleGetServerStatus);

  return router;
}
