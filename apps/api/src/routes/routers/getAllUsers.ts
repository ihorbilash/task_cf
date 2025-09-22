import { ExpressRoute, ExpressRequest, ExpressResponse, router } from '@monorepo/core/src/server/api-server.js';

export function createGetAllUsersRouter(): ExpressRoute {
  function handleGetAllUsers(_req: ExpressRequest, res: ExpressResponse) {
    res.status(200).json({ status: 'ok' });
  }

  router.get('/users', handleGetAllUsers);

  return router;
}
