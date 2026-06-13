import { Typography } from 'antd';
import TaskCard from './TaskCard';
import type { Task } from '../types/Task';

const { Title } = Typography;

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

const TaskColumn = ({ title, tasks }: TaskColumnProps) => {
  return (
    <div style={{ flex: 1, margin: '0 8px', background: '#f5f5f5', borderRadius: 8, padding: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
      <Title level={4} style={{ textAlign: 'center' }}>{title}</Title>
      {tasks.map(task => (
        <TaskCard key={task.id} id={task.id} title={task.title} status={task.status} />
      ))}
    </div>
  );
};

export default TaskColumn;