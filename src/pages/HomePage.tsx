import { Spin } from 'antd';
import { useTasks } from '../hooks/useTasks';
import TaskColumn from '../components/TaskColumn';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (error) return <div>Ошибка загрузки задач</div>;

  const tasksByStatus = {
    0: tasks?.filter(t => t.status === 0) || [],
    1: tasks?.filter(t => t.status === 1) || [],
    2: tasks?.filter(t => t.status === 2) || [],
  };

  return (
    <div className={styles.columnsContainer}>
      <TaskColumn title="К выполнению" tasks={tasksByStatus[0]} />
      <TaskColumn title="В работе" tasks={tasksByStatus[1]} />
      <TaskColumn title="Выполнено" tasks={tasksByStatus[2]} />
    </div>
  );
};

export default HomePage;