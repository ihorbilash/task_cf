import { Router } from 'express';
import { ExpressRoute, ExpressRequest, ExpressResponse } from '@monorepo/core/src/server/api-server.js';
import { getUsersUseCase, AllowedUserDto } from '@monorepo/common/src/usecases/get-users.usecase.js';

export type ResponseUsers = AllowedUserDto;

export function createGetAllUsersRouter(): ExpressRoute {
  const router = Router();

  async function handleGetAllUsers(_req: ExpressRequest, res: ExpressResponse) {
    const data = await getUsersUseCase.execute();
    res.status(200).json({ data });
  }

  router.get('/api/users-list', handleGetAllUsers);

  return router;
}
