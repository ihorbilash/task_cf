import { ExpressRoute, ExpressRequest, ExpressResponse, router } from '@monorepo/core/src/server/api-server.js';

export function createAddUserRouter(): ExpressRoute {
  async function getUserByTgId(req: ExpressRequest, res: ExpressResponse) {
    res.status(200).json({ method: 'GET', query: req.query });
  }

  async function addUserByTgId(req: ExpressRequest, res: ExpressResponse) {
    res.status(200).json({ method: 'POST', body: req.body });
  }

  router.get('/user/:tgId', getUserByTgId);
  router.post('/user/:tgId', addUserByTgId);

  return router;
}
