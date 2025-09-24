import e, { Router } from 'express';
import { ExpressRoute, ExpressRequest, ExpressResponse } from '@monorepo/core/src/server/api-server.js';
import { userRepository } from '@monorepo/common/src/entities/user/user.repository.js';
import { JSONSchemaType, validator } from '@monorepo/core/src/validation.js';
import {
  addPermissionToUserUseCase,
  ExecutionOptions,
} from '@monorepo/common/src/usecases/add-permission-to-user.usecase.js';

export type RequestUserBody = ExecutionOptions;

export type ResponseUser = {
  _id: string;
  username: string;
  telegramId: number;
  createdAt?: string;
  updatedAt?: string;
};

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
  const router = Router();

  async function addUserPermission(req: ExpressRequest, res: ExpressResponse) {
    const isValid = validator.validate(requestBodySchema, req.body);
    if (!isValid) return res.status(400).json({ message: 'Invalid payload', errors: validator.errors });
    const { username } = req.body;
    const permission = await addPermissionToUserUseCase.execute({ username });
    res.status(201).json({ isUpdated: permission });
  }

  router.post('/api/update-user', addUserPermission);

  return router;
}
