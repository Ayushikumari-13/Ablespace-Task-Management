'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/theme/themeProvider';

type TopbarProps = {
  title: string;
  description?: string;
  showDashboardButton?: boolean;
  showLogout?: boolean;
  showThemeToggle?: boolean;
  onMenuClick?: () => void;
};

export default function Topbar({
  title,
  description,
  showDashboardButton = false,
  showLogout = false,
  showThemeToggle = false,
  onMenuClick,
}: TopbarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem(
      'ablespace_access_token',
    );

    localStorage.removeItem(
      'accessToken',
    );

    router.push('/login');
  };

  const handleThemeToggle = () => {
    setTheme(
      theme === 'dark'
        ? 'light'
        : 'dark',
    );
  };

  return (
    <header className="flex min-h-20 items-center justify-between border-b border-slate-800 bg-slate-900 px-5 md:px-8">

      {/* LEFT */}
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-slate-400">
            {description}
          </p>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex shrink-0 items-center gap-2">

        {/* Theme */}
        {showThemeToggle && (
          <button
            type="button"
            onClick={handleThemeToggle}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            aria-label="Toggle theme"
          >
            {theme === 'dark'
              ? '☀️ Light'
              : '🌙 Dark'}
          </button>
        )}

        {/* Dashboard */}
        {showDashboardButton && (
          <button
            type="button"
            onClick={() =>
              router.push('/dashboard')
            }
            className="hidden rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white sm:block"
          >
            Dashboard
          </button>
        )}

        {/* Logout */}
        {showLogout && (
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        )}

        {/* Mobile Menu */}
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white transition hover:bg-slate-700 md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>
        )}

      </div>
    </header>
  );
}