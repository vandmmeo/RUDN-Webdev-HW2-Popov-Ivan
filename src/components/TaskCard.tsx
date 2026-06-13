import { Link } from 'react-router-dom';
import { Card, Typography, Tag } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface TaskCardProps {
  id: number;
  title: string;
  status: 0 | 1 | 2;
}

const statusConfig = {
  0: { color: 'default', icon: <ClockCircleOutlined />, text: 'К выполнению' },
  1: { color: 'processing', icon: <SyncOutlined spin />, text: 'В работе' },
  2: { color: 'success', icon: <CheckCircleOutlined />, text: 'Выполнено' },
};

const TaskCard = ({ id, title, status }: TaskCardProps) => {
  const config = statusConfig[status];
  return (
    <Card size="small" style={{ marginBottom: 8, borderLeft: `4px solid ${status === 0 ? '#faad14' : status === 1 ? '#1890ff' : '#52c41a'}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>
          <Link to={`/task/${id}`}>№{id}</Link> - {title}
        </Text>
        <Tag color={config.color} icon={config.icon} style={{ margin: 0 }}>
          {config.text}
        </Tag>
      </div>
    </Card>
  );
};

export default TaskCard;