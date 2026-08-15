'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { saveToken } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        'http://localhost:4000/api/auth/guest',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          'Guest login failed:',
          errorText,
        );

        throw new Error(
          `Guest login failed (${response.status})`,
        );
      }

      const data = await response.json();

      console.log(
        'Guest login response:',
        data,
      );

      if (!data.accessToken) {
        throw new Error(
          'Access token was not returned by backend.',
        );
      }

      // Save JWT token
      saveToken(data.accessToken);

      // Check token
      const savedToken =
        localStorage.getItem(
          'ablespace_access_token',
        ) ||
        localStorage.getItem(
          'accessToken',
        );

      console.log(
        'Token saved:',
        savedToken ? 'YES' : 'NO',
      );

      if (!savedToken) {
        throw new Error(
          'Token could not be saved in browser.',
        );
      }

      // Go to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error(
        'Login error:',
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : 'Unable to login.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            AbleSpace
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Task Management System
          </p>
        </div>

        {/* Login */}
        <div className="space-y-5">

          <div>
            <h2 className="text-xl font-semibold text-white">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Continue as a guest to manage your tasks.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? 'Signing in...'
              : 'Continue as Guest'}
          </button>

        </div>
      </div>
    </main>
  );
}