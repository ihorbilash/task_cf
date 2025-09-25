import type { ResponseUsers } from '@monorepo/api/src/routes/routers/getAllUsers';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type Props = { users: ResponseUsers[]; loading?: boolean };

export default function UsersTable({ users, loading }: Props) {
  const columns: ColumnsType<ResponseUsers> = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Telegram ID', dataIndex: 'telegramId', key: 'telegramId' },
    {
      title: 'Allowed to Use Cloudflare Bot',
      dataIndex: 'allowed',
      key: 'allowed',
      render: (allowed) => (allowed ? 'Yes' : 'No'),
    },
  ];

  return <Table rowKey="telegramId" dataSource={users} columns={columns} loading={loading} pagination={false} />;
}
