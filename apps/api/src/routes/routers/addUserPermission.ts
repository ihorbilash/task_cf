import { ExpressRoute, ExpressRequest, ExpressResponse, router } from '@monorepo/core/src/server/api-server.js';
import { JSONSchemaType, validator } from '@monorepo/core/src/validation.js';

import {
  changePermissionToUserUseCase,
  ExecutionOptions,
} from '@monorepo/common/src/usecases/add-permission-to-user.usecase.js';

export type RequestUserBody = ExecutionOptions;

const requestBodySchema: JSONSchemaType<RequestUserBody> = {
  type: 'object',
  required: ['username'],
  properties: {
    username: { type: 'string' },
  },
};

export type ResponseUserData = {
  isUpdated: boolean;
};

export function createAddUserPermissionRouter(): ExpressRoute {
  async function addUserPermission(req: ExpressRequest, res: ExpressResponse) {
    const isValid = validator.validate(requestBodySchema, req.body);
    if (!isValid) return res.status(400).json({ message: 'Invalid payload', errors: validator.errors });
    const { username } = req.body;
    const status = await changePermissionToUserUseCase.execute({ username });
    res.status(201).json({ isUpdated: status });
  }

  router.post('/api/update-user', addUserPermission);

  return router;
}
