import { ExpressRoute } from '@monorepo/core/src/server/api-server.js';

import { createGetAllUsersRouter } from './routers/getAllUsers.js';
import { createAddUserPermissionRouter } from './routers/addUserPermission.js';
import { createServerStatusRouter } from './routers/serverStatus.js';

export function buildApiRoutes(): ExpressRoute[] {
  return [createGetAllUsersRouter(), createAddUserPermissionRouter(), createServerStatusRouter()];
}
