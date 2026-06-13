import axios from 'axios';
import type { Task } from '../types/Task';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const russianTitles: Record<number, string> = {
  1: 'Сделать домашнее задание',
  2: 'Купить продукты',
  3: 'Позвонить родителям',
  4: 'Записаться к врачу',
  5: 'Прочитать книгу',
  6: 'Убрать в комнате',
  7: 'Написать отчёт',
  8: 'Проверить почту',
  9: 'Зарядить ноутбук',
  10: 'Выпить воды',
};

const transformTodo = (todo: any): Task => ({
  id: todo.id,
  title: russianTitles[todo.id] || `Задача ${todo.id}`,
  description: '',
  createdAt: new Date(),
  status: todo.completed ? 2 : 0,
});

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data.slice(0, 10).map(transformTodo);
};