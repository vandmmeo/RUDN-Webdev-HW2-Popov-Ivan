import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks } from '../api/tasksApi';
import type { Task, TaskStatus } from '../types/Task';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTask: Omit<Task, 'id' | 'createdAt'>) => {
      const tasks = queryClient.getQueryData<Task[]>(['tasks']) || [];
      const newId = Math.max(0, ...tasks.map(t => t.id)) + 1;
      const task: Task = {
        ...newTask,
        id: newId,
        createdAt: new Date(),
      };
      return task;
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData<Task[]>(['tasks'], (old = []) => [...old, newTask]);
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: TaskStatus }) => {
      return { id, status };
    },
    onSuccess: ({ id, status }) => {
      queryClient.setQueryData<Task[]>(['tasks'], (old = []) =>
        old.map(task => (task.id === id ? { ...task, status } : task))
      );
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<Task[]>(['tasks'], (old = []) =>
        old.filter(task => task.id !== id)
      );
    },
  });
};