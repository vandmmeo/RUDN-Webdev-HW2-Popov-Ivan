import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CreateTaskPage from './pages/CreateTaskPage';
import TaskDetailPage from './pages/TaskDetailPage';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateTaskPage />} />
          <Route path="/task/:id" element={<TaskDetailPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;