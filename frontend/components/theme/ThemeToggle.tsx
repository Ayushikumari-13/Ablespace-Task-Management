'use client';

import { useTheme } from './themeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
    >
      {theme === 'dark' ? '?? Light' : '?? Dark'}
    </button>
  );
}
