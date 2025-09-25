import { useAPIFetch } from './fetch';
import type { RequestUserBody, ResponseUserData } from '@monorepo/api/src/routes/routers/addUserPermission';
import type { ResponseUsers } from '@monorepo/api/src/routes/routers/getAllUsers';

export async function getAllUsers(): Promise<ResponseUsers[]> {
  return await useAPIFetch<ResponseUsers[]>('/users-list', {
    method: 'GET',
  });
}

export async function handleUserPermission(payload: RequestUserBody) {
  const userData = await useAPIFetch<ResponseUserData>('/update-user', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!userData.isUpdated) throw new Error('Failed to change user permission');
}
