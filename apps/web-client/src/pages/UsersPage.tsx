import { useEffect, useState } from 'react';
import { App as AntApp, Card, Flex, Typography } from 'antd';
import UsersTable from '../components/UsersTable';
import AddUserForm from '../components/AddUserForm';
import { addedUserPermission, getAllUsers } from '../api/users';
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
        console.log('🚀 ~ UsersPage ~ data:', data);
        setUsers(data);
      } catch (err: any) {
        message.error(err?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    })();
  }, [message]);

  const handleAddPermission = async (v: { username: string }) => {
    setSubmitting(true);
    try {
      const created = await addedUserPermission(v);
      setUsers((prev) => [created, ...prev]);
      message.success('User permission updated successfully');
    } catch (err: any) {
      message.error(err?.message || 'Failed to update user permission');
    } finally {
      setSubmitting(false);
    }
  }; //width: '100vh'

  return (
    <Flex vertical gap={16} style={{ padding: 24 }}>
      <Typography.Title level={3}>Allowed Users</Typography.Title>
      <Card>
        <AddUserForm onSubmit={handleAddPermission} loading={submitting} />
      </Card>
      <Card>
        <UsersTable users={users} loading={loading} />
      </Card>
    </Flex>
  );
}
