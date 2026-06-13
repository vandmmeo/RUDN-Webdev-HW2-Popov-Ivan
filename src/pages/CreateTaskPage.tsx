import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateTask } from '../hooks/useTasks';

const { TextArea } = Input;

const CreateTaskPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const createTask = useCreateTask();

  const onFinish = async (values: { title: string; description: string }) => {
    try {
      await createTask.mutateAsync({
        title: values.title,
        description: values.description,
        status: 0,
      });
      message.success('Задача создана');
      navigate('/');
    } catch (error) {
      message.error('Ошибка создания');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Название"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Описание">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={createTask.isPending}>
            Создать
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTaskPage;