'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from '@/components/layout/Sidebar';
import MobileSidebar from '@/components/layout/MobileSidebar';
import { useTheme } from '@/components/theme/themeProvider';

type SettingTab =
  | 'profile'
  | 'notifications'
  | 'appearance'
  | 'security';

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] =
    useState<SettingTab>('profile');

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState(true);

  const [name, setName] =
    useState('Guest User');

  const [saved, setSaved] =
    useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem(
      'ablespace_access_token',
    );

    localStorage.removeItem(
      'accessToken',
    );

    router.push('/login');
  };

  const handleClearData = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all local application data?',
    );

    if (!confirmed) {
      return;
    }

    localStorage.clear();

    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white transition-colors duration-300">
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

        {/* Main Content */}
        <main className="min-w-0 flex-1">

          {/* ================= TOPBAR ================= */}
          <header className="flex min-h-20 items-center justify-between border-b border-slate-800 bg-slate-900 px-5 md:px-8">

            <div>
              <h1 className="text-xl font-bold text-white">
                Settings
              </h1>

              <p className="text-sm text-slate-400">
                Manage your AbleSpace account
              </p>
            </div>

            <div className="flex items-center gap-2">

              {/* Dashboard */}
              <button
                type="button"
                onClick={() =>
                  router.push('/dashboard')
                }
                className="hidden rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white sm:block"
              >
                Dashboard
              </button>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="hidden rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 sm:block"
              >
                Logout
              </button>

              {/* Mobile menu */}
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

          {/* ================= CONTENT ================= */}
          <div className="p-5 md:p-8">

            {/* Page Heading */}
            <div className="mb-8">

              <h2 className="text-3xl font-bold text-white">
                Settings
              </h2>

              <p className="mt-2 text-slate-400">
                Customize your AbleSpace experience.
              </p>

            </div>

            {/* ================= SETTINGS GRID ================= */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">

              {/* Settings Navigation */}
              <aside className="h-fit rounded-xl border border-slate-800 bg-slate-900 p-4">

                <h3 className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Settings Menu
                </h3>

                <nav className="space-y-1">

                  {/* Profile */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab('profile')
                    }
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                      activeTab === 'profile'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">
                      👤
                    </span>
                    Profile
                  </button>

                  {/* Notifications */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        'notifications',
                      )
                    }
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                      activeTab === 'notifications'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">
                      🔔
                    </span>
                    Notifications
                  </button>

                  {/* Appearance */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab('appearance')
                    }
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                      activeTab === 'appearance'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">
                      🎨
                    </span>
                    Appearance
                  </button>

                  {/* Security */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab('security')
                    }
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                      activeTab === 'security'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">
                      🔒
                    </span>
                    Security
                  </button>

                </nav>

              </aside>

              {/* ================= RIGHT PANEL ================= */}
              <section className="min-w-0">

                {/* PROFILE */}
                {activeTab === 'profile' && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 md:p-6">

                    <div className="border-b border-slate-800 pb-5">

                      <h3 className="text-xl font-semibold text-white">
                        Profile Settings
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Update your profile information.
                      </p>

                    </div>

                    <div className="mt-6 space-y-5">

                      {/* Name */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          Full Name
                        </label>

                        <input
                          type="text"
                          value={name}
                          onChange={(event) =>
                            setName(
                              event.target.value,
                            )
                          }
                          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          Email Address
                        </label>

                        <input
                          type="email"
                          value="guest@ablespace.local"
                          readOnly
                          className="w-full cursor-not-allowed rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400 outline-none"
                        />
                      </div>

                      {/* Save */}
                      <button
                        type="button"
                        onClick={handleSave}
                        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                      >
                        {saved
                          ? '✓ Changes Saved'
                          : 'Save Changes'}
                      </button>

                    </div>

                  </div>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === 'notifications' && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 md:p-6">

                    <div className="border-b border-slate-800 pb-5">

                      <h3 className="text-xl font-semibold text-white">
                        Notifications
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Manage your task notifications.
                      </p>

                    </div>

                    <div className="mt-6">

                      <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-950 p-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                          <p className="font-medium text-white">
                            Task Notifications
                          </p>

                          <p className="mt-1 text-sm text-slate-400">
                            Receive notifications about your tasks.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setNotifications(
                              !notifications,
                            )
                          }
                          aria-label="Toggle task notifications"
                          className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                            notifications
                              ? 'bg-blue-600'
                              : 'bg-slate-700'
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                              notifications
                                ? 'left-6'
                                : 'left-1'
                            }`}
                          />
                        </button>

                      </div>

                    </div>

                  </div>
                )}

                {/* APPEARANCE */}
                {activeTab === 'appearance' && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 md:p-6">

                    <div className="border-b border-slate-800 pb-5">

                      <h3 className="text-xl font-semibold text-white">
                        Appearance
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Choose how AbleSpace looks.
                      </p>

                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                      {/* Dark */}
                      <button
                        type="button"
                        onClick={() =>
                          setTheme('dark')
                        }
                        className={`rounded-xl border p-6 text-left transition ${
                          theme === 'dark'
                            ? 'border-blue-500 bg-blue-600/10 ring-1 ring-blue-500'
                            : 'border-slate-700 hover:bg-slate-800'
                        }`}
                      >

                        <div className="flex items-center justify-between">

                          <span className="text-3xl">
                            🌙
                          </span>

                          {theme === 'dark' && (
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                              Active
                            </span>
                          )}

                        </div>

                        <h4 className="mt-5 font-semibold text-white">
                          Dark Mode
                        </h4>

                        <p className="mt-1 text-sm text-slate-400">
                          A comfortable dark interface for everyday use.
                        </p>

                      </button>

                      {/* Light */}
                      <button
                        type="button"
                        onClick={() =>
                          setTheme('light')
                        }
                        className={`rounded-xl border p-6 text-left transition ${
                          theme === 'light'
                            ? 'border-blue-500 bg-blue-600/10 ring-1 ring-blue-500'
                            : 'border-slate-700 hover:bg-slate-800'
                        }`}
                      >

                        <div className="flex items-center justify-between">

                          <span className="text-3xl">
                            ☀️
                          </span>

                          {theme === 'light' && (
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                              Active
                            </span>
                          )}

                        </div>

                        <h4 className="mt-5 font-semibold text-white">
                          Light Mode
                        </h4>

                        <p className="mt-1 text-sm text-slate-400">
                          A clean and bright interface for daytime use.
                        </p>

                      </button>

                    </div>

                    {/* Current Theme */}
                    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5">

                      <p className="text-sm text-slate-400">
                        Current Theme
                      </p>

                      <p className="mt-2 font-semibold text-white">
                        {theme === 'dark'
                          ? '🌙 Dark Mode'
                          : '☀️ Light Mode'}
                      </p>

                    </div>

                  </div>
                )}

                {/* SECURITY */}
                {activeTab === 'security' && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 md:p-6">

                    <div className="border-b border-slate-800 pb-5">

                      <h3 className="text-xl font-semibold text-white">
                        Security
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Manage your account and application data.
                      </p>

                    </div>

                    <div className="mt-6 space-y-4">

                      {/* Account */}
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

                        <div className="flex items-center gap-4">

                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                            G
                          </div>

                          <div>
                            <p className="font-semibold text-white">
                              Guest User
                            </p>

                            <p className="text-sm text-slate-400">
                              guest@ablespace.local
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* Clear Data */}
                      <button
                        type="button"
                        onClick={handleClearData}
                        className="w-full rounded-xl border border-red-800 bg-red-950/30 px-5 py-4 text-left transition hover:bg-red-950"
                      >
                        <p className="font-medium text-red-400">
                          🗑️ Clear Local Data
                        </p>

                        <p className="mt-1 text-sm text-red-400/70">
                          Remove locally stored application data.
                        </p>
                      </button>

                      {/* Logout */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full rounded-xl bg-red-600 px-5 py-4 text-left font-medium text-white transition hover:bg-red-700"
                      >
                        <p>
                          🚪 Logout
                        </p>

                        <p className="mt-1 text-sm text-red-100">
                          Sign out of your AbleSpace account.
                        </p>
                      </button>

                    </div>

                  </div>
                )}

              </section>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}