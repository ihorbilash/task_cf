import { ExpressRoute } from '@monorepo/core/src/server/api-server.js';

import { createGetAllUsersRouter } from './routers/getAllUsers.js';
import { createAddUserRouter } from './routers/addUser.js';
import { createServerStatusRouter } from './routers/serverStatus.js';

export function buildApiRoutes(): ExpressRoute[] {
  return [createGetAllUsersRouter(), createAddUserRouter(), createServerStatusRouter()];
}
