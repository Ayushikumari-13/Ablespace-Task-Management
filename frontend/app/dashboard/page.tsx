'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useTheme } from '@/components/theme/themeProvider';

import Sidebar from '@/components/layout/Sidebar';
import MobileSidebar from '@/components/layout/MobileSidebar';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

import { useTasks } from '@/hooks/useTasks';
import type { TaskStatus } from '@/types/task';

export default function DashboardPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] =
    useState('');

  const [status, setStatus] =
    useState<TaskStatus>('todo');

  const [dueDate, setDueDate] = useState('');

  const [saving, setSaving] = useState(false);

  /* =========================
     Statistics
  ========================= */

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === 'todo',
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === 'in-progress',
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === 'done',
  ).length;

  /* =========================
     Reset Form
  ========================= */

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('todo');
    setDueDate('');
  };

  /* =========================
     Create Task
  ========================= */

  const handleCreateTask = async () => {
    if (!title.trim()) {
      alert('Please enter a task title.');
      return;
    }

    try {
      setSaving(true);

      await createTask({
        title: title.trim(),
        description: description.trim(),
        status,
        dueDate: dueDate || undefined,
      });

      resetForm();
      setShowModal(false);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : 'Failed to create task.',
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     Update Status
  ========================= */

  const handleStatusChange = async (
    id: string,
    newStatus: TaskStatus,
  ) => {
    try {
      await updateTask(id, {
        status: newStatus,
      });
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : 'Failed to update task.',
      );
    }
  };

  /* =========================
     Delete Task
  ========================= */

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?',
    );

    if (!confirmed) return;

    try {
      await deleteTask(id);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : 'Failed to delete task.',
      );
    }
  };

  /* =========================
     Logout
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem(
      'ablespace_access_token',
    );

    localStorage.removeItem('accessToken');

    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">

        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Sidebar */}
        <MobileSidebar
          open={mobileMenuOpen}
          onClose={() =>
            setMobileMenuOpen(false)
          }
        />

        {/* Main */}
        <main className="min-w-0 flex-1">

          {/* Topbar */}
          <header className="flex min-h-20 items-center justify-between border-b border-slate-800 bg-slate-900 px-5 md:px-8">

            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-white">
                Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Manage your tasks easily
              </p>
            </div>

            <div className="flex items-center gap-2">

              {/* Theme */}
              <Button
                variant="secondary"
                onClick={() =>
                  setTheme(
                    theme === 'dark'
                      ? 'light'
                      : 'dark',
                  )
                }
              >
                {theme === 'dark'
                  ? '☀️ Light'
                  : '🌙 Dark'}
              </Button>

              {/* Logout */}
              <Button
                variant="danger"
                onClick={handleLogout}
              >
                Logout
              </Button>

              {/* Mobile Menu */}
              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(true)
                }
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white transition hover:bg-slate-700 md:hidden"
                aria-label="Open menu"
              >
                ☰
              </button>

            </div>
          </header>

          {/* Content */}
          <div className="p-5 md:p-8">

            {/* Welcome */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                Welcome back 👋
              </h2>

              <p className="mt-2 text-slate-400">
                Here is an overview of your tasks.
              </p>
            </section>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
                {error}
              </div>
            )}

            {/* Statistics */}
            <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <Card className="p-5">
                <p className="text-sm text-slate-400">
                  Total Tasks
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {totalTasks}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  All tasks
                </p>
              </Card>

              <Card className="p-5">
                <p className="text-sm text-slate-400">
                  To Do
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {todoTasks}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Tasks to start
                </p>
              </Card>

              <Card className="p-5">
                <p className="text-sm text-slate-400">
                  In Progress
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {progressTasks}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Currently working
                </p>
              </Card>

              <Card className="p-5">
                <p className="text-sm text-slate-400">
                  Completed
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {completedTasks}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Finished tasks
                </p>
              </Card>

            </section>

            {/* Tasks */}
            <section className="mt-8 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

              <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    My Tasks
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    View and manage your tasks.
                  </p>
                </div>

                <Button
                  onClick={() =>
                    setShowModal(true)
                  }
                >
                  + Add Task
                </Button>

              </div>

              {/* Loading */}
              {loading && (
                <div className="p-10 text-center text-slate-400">
                  Loading tasks...
                </div>
              )}

              {/* Empty */}
              {!loading &&
                tasks.length === 0 && (
                  <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">

                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-2xl">
                      📝
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      No tasks yet
                    </h3>

                    <p className="mt-2 max-w-md text-sm text-slate-400">
                      Create your first task to start
                      managing your work.
                    </p>

                    <Button
                      className="mt-6"
                      onClick={() =>
                        setShowModal(true)
                      }
                    >
                      Create Task
                    </Button>

                  </div>
                )}

              {/* Task List */}
              {!loading &&
                tasks.length > 0 && (
                  <div className="divide-y divide-slate-800">

                    {tasks.map((task) => (
                      <div
                        key={task._id}
                        className="p-5"
                      >

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                          <div className="min-w-0">

                            <h3 className="text-lg font-semibold text-white">
                              {task.title}
                            </h3>

                            {task.description && (
                              <p className="mt-1 text-sm text-slate-400">
                                {task.description}
                              </p>
                            )}

                            {task.dueDate && (
                              <p className="mt-2 text-xs text-slate-500">
                                Due:{' '}
                                {new Date(
                                  task.dueDate,
                                ).toLocaleDateString()}
                              </p>
                            )}

                          </div>

                          <div className="flex flex-wrap items-center gap-2">

                            <select
                              value={task.status}
                              onChange={(event) =>
                                handleStatusChange(
                                  task._id,
                                  event.target.value as TaskStatus,
                                )
                              }
                              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                            >
                              <option value="todo">
                                To Do
                              </option>

                              <option value="in-progress">
                                In Progress
                              </option>

                              <option value="done">
                                Completed
                              </option>
                            </select>

                            <Button
                              variant="danger"
                              onClick={() =>
                                handleDelete(
                                  task._id,
                                )
                              }
                            >
                              Delete
                            </Button>

                          </div>

                        </div>

                      </div>
                    ))}

                  </div>
                )}

            </section>
          </div>
        </main>
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

          <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-semibold text-white">
                Create New Task
              </h2>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
                className="text-2xl text-slate-400 transition hover:text-white"
              >
                ×
              </button>

            </div>

            <div className="space-y-5">

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Task Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Enter task title"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Enter task description"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as TaskStatus,
                    )
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option value="todo">
                    To Do
                  </option>

                  <option value="in-progress">
                    In Progress
                  </option>

                  <option value="done">
                    Completed
                  </option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) =>
                    setDueDate(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 pt-2">

                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleCreateTask}
                  disabled={saving}
                >
                  {saving
                    ? 'Creating...'
                    : 'Create Task'}
                </Button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}