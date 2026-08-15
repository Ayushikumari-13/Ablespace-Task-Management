export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  ownerId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateTaskData = {
  title: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string;
};

export type UpdateTaskData = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string;
};