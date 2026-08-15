'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
} from '@/lib/api';

import type {
  CreateTaskData,
  Task,
  UpdateTaskData,
} from '@/types/task';

type UseTasksResult = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (data: CreateTaskData) => Promise<Task>;
  updateTask: (
    id: string,
    data: UpdateTaskData,
  ) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
};

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiGet<Task[]>('/tasks');

      setTasks(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to load tasks.';

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const createTask = async (
    data: CreateTaskData,
  ): Promise<Task> => {
    const newTask = await apiPost<Task>('/tasks', data);

    setTasks((currentTasks) => [
      newTask,
      ...currentTasks,
    ]);

    return newTask;
  };

  const updateTask = async (
    id: string,
    data: UpdateTaskData,
  ): Promise<Task> => {
    const updatedTask = await apiPatch<Task>(
      `/tasks/${id}`,
      data,
    );

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === id ? updatedTask : task,
      ),
    );

    return updatedTask;
  };

  const deleteTask = async (
    id: string,
  ): Promise<void> => {
    await apiDelete(`/tasks/${id}`);

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== id),
    );
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks,
  };
}