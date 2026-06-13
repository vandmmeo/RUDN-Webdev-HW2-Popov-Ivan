import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Space, message, Spin } from 'antd';
import { useTasks, useUpdateTaskStatus, useDeleteTask } from '../hooks/useTasks';
import type { TaskStatus } from '../types/Task';

const statusText: Record<TaskStatus, string> = {
  0: 'К выполнению',
  1: 'В работе',
  2: 'Выполнено',
};

const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: tasks, isLoading } = useTasks();
  const updateStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

  const task = tasks?.find(t => t.id === Number(id));
  if (!task) return <div>Задача не найдена</div>;

  const handleStatusChange = async (newStatus: TaskStatus) => {
    await updateStatus.mutateAsync({ id: task.id, status: newStatus });
    message.success('Статус обновлён');
  };

  const handleDelete = async () => {
    await deleteTask.mutateAsync(task.id);
    message.success('Задача удалена');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      <Card title={`Задача №${task.id}`}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Название">{task.title}</Descriptions.Item>
          <Descriptions.Item label="Описание">{task.description || '—'}</Descriptions.Item>
          <Descriptions.Item label="Дата создания">
            {task.createdAt.toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Статус">{statusText[task.status]}</Descriptions.Item>
        </Descriptions>

        <Space style={{ marginTop: 24 }}>
          {task.status !== 0 && (
            <Button onClick={() => handleStatusChange(0)}>К выполнению</Button>
          )}
          {task.status !== 1 && (
            <Button onClick={() => handleStatusChange(1)}>В работу</Button>
          )}
          {task.status !== 2 && (
            <Button onClick={() => handleStatusChange(2)}>Выполнено</Button>
          )}
          <Button danger onClick={handleDelete}>Удалить</Button>
        </Space>
      </Card>
    </div>
  );
};

export default TaskDetailPage;