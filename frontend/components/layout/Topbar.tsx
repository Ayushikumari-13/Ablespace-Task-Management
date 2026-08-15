'use client';

import ThemeToggle from '@/components/theme/ThemeToggle';

type TopbarProps = {
  onMenuClick?: () => void;
};

export default function Topbar({
  onMenuClick,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[74px] items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 md:px-8">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Dashboard
          </h2>

          <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
            Manage your tasks easily
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <button
          type="button"
          className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:block"
        >
          Logout
        </button>
      </div>
    </header>
  );
}