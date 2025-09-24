import { useAPIFetch } from './fetch';
import type { RequestUserBody, ResponseUserData } from '@monorepo/api/src/routes/routers/addUserPermission';
import type { ResponseUsers } from '@monorepo/api/src/routes/routers/getAllUsers';

export async function getAllUsers(): Promise<ResponseUsers[]> {
  const res = await useAPIFetch<ResponseUsers[]>('/users-list', {
    method: 'GET',
  });

  return res.data;
}

export async function addedUserPermission(payload: RequestUserBody): Promise<any> {
  const userData = await useAPIFetch<ResponseUserData>('/update-user', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!userData.isUpdated) throw new Error('Failed to add user');
}
