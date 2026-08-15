import type { Metadata } from 'next';
import './globals.css';

import ThemeProvider from '@/components/theme/themeProvider';

export const metadata: Metadata = {
  title: 'AbleSpace',
  description: 'Task Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}