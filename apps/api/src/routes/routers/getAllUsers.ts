import { ExpressRoute, ExpressRequest, ExpressResponse, router } from '@monorepo/core/src/server/api-server.js';

import { getUsersUseCase, AllowedUserDto } from '@monorepo/common/src/usecases/get-users.usecase.js';

export type ResponseUsers = AllowedUserDto;

export function createGetAllUsersRouter(): ExpressRoute {
  async function handleGetAllUsers(_req: ExpressRequest, res: ExpressResponse) {
    const users = await getUsersUseCase.execute();
    res.status(200).json(users);
  }

  router.get('/api/users-list', handleGetAllUsers);

  return router;
}
