import { Button, Form, Input, Space } from 'antd';

type Props = {
  onSubmit: (v: { username: string }) => Promise<void> | void;
  loading?: boolean;
};

export default function AddUserForm({ onSubmit, loading }: Props) {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    await onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="inline" onFinish={handleFinish} autoComplete="off">
      <Space size="middle" wrap>
        <Form.Item
          layout="vertical"
          name="username"
          label="example: @telegramUserName"
          rules={[{ required: true, message: 'Username is required' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add user
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
}
