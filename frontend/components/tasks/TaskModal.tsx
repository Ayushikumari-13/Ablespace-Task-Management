'use client';

import TaskForm from './TaskForm';

import type { CreateTaskData } from '@/types/task';

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskData) => Promise<void>;
  loading?: boolean;
};

export default function TaskModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}: TaskModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Create New Task
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add a new task to your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <TaskForm
          onSubmit={onSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </div>
    </div>
  );
}