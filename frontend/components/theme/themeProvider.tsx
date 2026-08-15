'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

const THEME_KEY = 'ablespace_theme';

export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] =
    useState<Theme>('dark');

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(THEME_KEY);

    const initialTheme: Theme =
      savedTheme === 'light'
        ? 'light'
        : 'dark';

    setThemeState(initialTheme);

    document.documentElement.setAttribute(
      'data-theme',
      initialTheme,
    );

    document.documentElement.classList.toggle(
      'dark',
      initialTheme === 'dark',
    );

    document.documentElement.style.colorScheme =
      initialTheme;

    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    localStorage.setItem(
      THEME_KEY,
      newTheme,
    );

    document.documentElement.setAttribute(
      'data-theme',
      newTheme,
    );

    document.documentElement.classList.toggle(
      'dark',
      newTheme === 'dark',
    );

    document.documentElement.style.colorScheme =
      newTheme;
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used inside ThemeProvider',
    );
  }

  return context;
}