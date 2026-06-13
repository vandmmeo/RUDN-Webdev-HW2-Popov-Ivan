import { useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Space } from 'antd';
import { UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const Header = () => {
  const navigate = useNavigate();

  return (
    <AntHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#001529' }}>
      <Space>
        <UnorderedListOutlined style={{ fontSize: 24, color: 'white' }} />
        <Title level={3} style={{ color: 'white', margin: 0 }}>Доска задач</Title>
      </Space>
      <Space>
        <Button type="primary" icon={<UnorderedListOutlined />} onClick={() => navigate('/')}>
          Колонки
        </Button>
        <Button type="default" icon={<PlusOutlined />} onClick={() => navigate('/create')}>
          Создать задачу
        </Button>
        <Text style={{ color: 'white', marginLeft: 16 }}>Попов Иван ХМНбд-04-24</Text>
      </Space>
    </AntHeader>
  );
};

export default Header;