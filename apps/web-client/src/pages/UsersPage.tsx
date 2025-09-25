import { useEffect, useState } from 'react';
import { App as AntApp, Card, Flex, Typography } from 'antd';
import UsersTable from '../components/UsersTable';
import AddUserForm from '../components/AddUserForm';
import { handleUserPermission, getAllUsers } from '../api/users';
import type { ResponseUsers } from '@monorepo/api/src/routes/routers/getAllUsers';

export default function UsersPage() {
  const { message } = AntApp.useApp();
  const [users, setUsers] = useState<ResponseUsers[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getAllUsers();

        setUsers(data);
      } catch (err: any) {
        message.error(err?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    })();
  }, [message]);

  const changePermission = async (v: { username: string }) => {
    setSubmitting(true);
    try {
      await handleUserPermission(v);

      setUsers((prev) =>
        prev.map((u) => {
          if (u.username === v.username) {
            return { ...u, allowed: !u.allowed };
          }
          return u;
        }),
      );
      message.success('User permission updated successfully');
    } catch (err: any) {
      message.error(err?.message || 'Failed to update user permission');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex vertical gap={16} style={{ padding: 24 }}>
      <Typography.Title level={3}>Allowed Users Admin Panel</Typography.Title>
      <Card>
        <AddUserForm onSubmit={changePermission} loading={submitting} />
      </Card>
      <Card>
        <UsersTable users={users} loading={loading} />
      </Card>
    </Flex>
  );
}
