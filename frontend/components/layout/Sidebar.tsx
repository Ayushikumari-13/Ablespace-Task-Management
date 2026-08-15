'use client';

import { usePathname, useRouter } from 'next/navigation';

type SidebarProps = {
  mobile?: boolean;
  onClose?: () => void;
};

export default function Sidebar({
  mobile = false,
  onClose,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const goTo = (path: string) => {
    if (pathname === path) {
      onClose?.();
      return;
    }

    router.push(path);
    onClose?.();
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside
      className={`
        ${mobile ? 'w-full' : 'hidden w-64 shrink-0 md:block'}
        min-h-screen
        border-r border-slate-800
        bg-slate-900
      `}
    >
      <div className="p-6">

        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white">
            AbleSpace
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Task Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">

          {/* Dashboard */}
          <button
            type="button"
            onClick={() => goTo('/dashboard')}
            className={`
              block w-full rounded-lg px-4 py-3
              text-left text-sm font-medium
              transition
              ${
                isActive('/dashboard')
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }
            `}
          >
            Dashboard
          </button>

          {/* Tasks */}
          <button
            type="button"
            onClick={() => goTo('/tasks')}
            className={`
              block w-full rounded-lg px-4 py-3
              text-left text-sm font-medium
              transition
              ${
                isActive('/tasks')
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }
            `}
          >
            Tasks
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => goTo('/settings')}
            className={`
              block w-full rounded-lg px-4 py-3
              text-left text-sm font-medium
              transition
              ${
                isActive('/settings')
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }
            `}
          >
            Settings
          </button>

        </nav>
      </div>
    </aside>
  );
}