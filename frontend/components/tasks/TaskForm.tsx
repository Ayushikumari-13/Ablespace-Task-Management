'use client';

import { FormEvent, useState } from 'react';

import type {
  CreateTaskData,
  TaskStatus,
} from '@/types/task';

type TaskFormProps = {
  onSubmit: (data: CreateTaskData) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
};

export default function TaskForm({
  onSubmit,
  onCancel,
  loading = false,
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] =
    useState<TaskStatus>('todo');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title.');
      return;
    }

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Task Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Enter task title"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-blue-950"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="Enter task description"
          rows={4}
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-blue-950"
        />
      </div>

      {/* Status + Due Date */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as TaskStatus,
              )
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">
              In Progress
            </option>
            <option value="done">Completed</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}