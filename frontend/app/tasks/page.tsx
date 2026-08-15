'use client';

import { useState } from 'react';

import Sidebar from '@/components/layout/Sidebar';
import MobileSidebar from '@/components/layout/MobileSidebar';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Topbar from '@/components/ui/Topbar';

import { useTasks } from '@/hooks/useTasks';
import type { TaskStatus } from '@/types/task';

export default function TasksPage() {
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

  const [editingTaskId, setEditingTaskId] =
    useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] =
    useState('');

  const [status, setStatus] =
    useState<TaskStatus>('todo');

  const [dueDate, setDueDate] =
    useState('');

  const [saving, setSaving] =
    useState(false);

  const [search, setSearch] =
    useState('');

  const [filterStatus, setFilterStatus] =
    useState<'all' | TaskStatus>('all');

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

  const filteredTasks = tasks.filter((task) => {
    const searchText =
      search.trim().toLowerCase();

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(searchText) ||
      (task.description || '')
        .toLowerCase()
        .includes(searchText);

    const matchesStatus =
      filterStatus === 'all' ||
      task.status === filterStatus;

    return (
      matchesSearch && matchesStatus
    );
  });

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('todo');
    setDueDate('');
  };

  const openCreateModal = () => {
    setEditingTaskId(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (
    task: (typeof tasks)[number],
  ) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description || '');
    setStatus(task.status);

    setDueDate(
      task.dueDate
        ? new Date(task.dueDate)
            .toISOString()
            .split('T')[0]
        : '',
    );

    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    resetForm();
    setEditingTaskId(null);
    setShowModal(false);
  };

  const handleSaveTask = async () => {
    if (!title.trim()) {
      alert('Please enter a task title.');
      return;
    }

    try {
      setSaving(true);

      const taskData = {
        title: title.trim(),
        description: description.trim(),
        status,
        dueDate:
          dueDate || undefined,
      };

      if (editingTaskId) {
        await updateTask(
          editingTaskId,
          taskData,
        );
      } else {
        await createTask(taskData);
      }

      resetForm();
      setEditingTaskId(null);
      setShowModal(false);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : editingTaskId
            ? 'Failed to update task.'
            : 'Failed to create task.',
      );
    } finally {
      setSaving(false);
    }
  };

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

  const handleDelete = async (
    id: string,
  ) => {
    const confirmed =
      window.confirm(
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

        <main className="min-w-0 flex-1">

          {/* Topbar */}
          <Topbar
            title="Tasks"
            description="Create, organize and manage your tasks"
            onMenuClick={() =>
              setMobileMenuOpen(true)
            }
          />

          <div className="p-5 md:p-8">

            {/* Page Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-3xl font-bold">
                  Task Management
                </h2>

                <p className="mt-2 text-slate-400">
                  Create, update and organize
                  your work efficiently.
                </p>
              </div>

              <Button
                variant="primary"
                onClick={openCreateModal}
              >
                + Add Task
              </Button>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
                {error}
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                label="Total Tasks"
                value={totalTasks}
                hint="All tasks"
              />

              <StatCard
                label="To Do"
                value={todoTasks}
                hint="Tasks to start"
              />

              <StatCard
                label="In Progress"
                value={progressTasks}
                hint="Currently working"
              />

              <StatCard
                label="Completed"
                value={completedTasks}
                hint="Finished tasks"
              />

            </div>

            {/* All Tasks */}
            <Card className="mt-8 overflow-hidden">

              <div className="border-b border-slate-800 p-5">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div>
                    <h2 className="text-xl font-semibold">
                      All Tasks
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      View and manage all your tasks.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">

                    <input
                      type="search"
                      value={search}
                      onChange={(event) =>
                        setSearch(
                          event.target.value,
                        )
                      }
                      placeholder="Search tasks..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 sm:w-64"
                    />

                    <select
                      value={filterStatus}
                      onChange={(event) =>
                        setFilterStatus(
                          event.target.value as
                            | 'all'
                            | TaskStatus,
                        )
                      }
                      className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                    >
                      <option value="all">
                        All Status
                      </option>

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

                </div>

              </div>

              {/* Loading */}
              {loading && (
                <div className="p-12 text-center text-slate-400">
                  Loading tasks...
                </div>
              )}

              {/* Empty */}
              {!loading &&
                filteredTasks.length === 0 && (
                  <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">

                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-2xl">
                      📝
                    </div>

                    <h3 className="text-lg font-semibold">
                      {tasks.length === 0
                        ? 'No tasks yet'
                        : 'No matching tasks'}
                    </h3>

                    <p className="mt-2 max-w-md text-sm text-slate-400">
                      {tasks.length === 0
                        ? 'Create your first task to start managing your work.'
                        : 'Try changing your search or status filter.'}
                    </p>

                    {tasks.length === 0 && (
                      <Button
                        variant="primary"
                        onClick={openCreateModal}
                        className="mt-6"
                      >
                        Create Task
                      </Button>
                    )}

                  </div>
                )}

              {/* Task List */}
              {!loading &&
                filteredTasks.length > 0 && (
                  <div className="divide-y divide-slate-800">

                    {filteredTasks.map(
                      (task) => (
                        <div
                          key={task._id}
                          className="p-5 transition hover:bg-slate-800/40"
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

                              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">

                                <span className="rounded-full bg-slate-800 px-3 py-1">
                                  {task.status ===
                                  'todo'
                                    ? 'To Do'
                                    : task.status ===
                                        'in-progress'
                                      ? 'In Progress'
                                      : 'Completed'}
                                </span>

                                {task.dueDate && (
                                  <span>
                                    Due:{' '}
                                    {new Date(
                                      task.dueDate,
                                    ).toLocaleDateString()}
                                  </span>
                                )}

                              </div>

                            </div>

                            <div className="flex flex-wrap items-center gap-2">

                              <select
                                value={
                                  task.status
                                }
                                onChange={(
                                  event,
                                ) =>
                                  handleStatusChange(
                                    task._id,
                                    event.target
                                      .value as TaskStatus,
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
                                variant="outline"
                                onClick={() =>
                                  openEditModal(
                                    task,
                                  )
                                }
                              >
                                Edit
                              </Button>

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
                      ),
                    )}

                  </div>
                )}

            </Card>

          </div>

        </main>

      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >

          <div
            className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-semibold">
                  {editingTaskId
                    ? 'Edit Task'
                    : 'Create New Task'}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {editingTaskId
                    ? 'Update the task details and save your changes.'
                    : 'Add a new task to your workspace.'}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={closeModal}
                className="px-3 py-1.5 text-2xl"
                aria-label="Close modal"
              >
                ×
              </Button>

            </div>

            <div className="space-y-5">

              {editingTaskId && (
                <div className="rounded-lg border border-blue-900/60 bg-blue-950/30 px-4 py-3 text-sm text-blue-300">
                  Editing this task will update
                  its title, description, status
                  and due date.
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Task Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value,
                    )
                  }
                  placeholder="Enter task title"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value,
                    )
                  }
                  placeholder="Enter task description"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target
                        .value as TaskStatus,
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

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) =>
                    setDueDate(
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">

                <Button
                  variant="outline"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </Button>

                <Button
                  variant="primary"
                  onClick={handleSaveTask}
                  disabled={saving}
                >
                  {saving
                    ? editingTaskId
                      ? 'Saving...'
                      : 'Creating...'
                    : editingTaskId
                      ? 'Save Changes'
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

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <Card className="p-5">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {hint}
      </p>
    </Card>
  );
}