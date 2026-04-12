import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/lib/providers';
import ToastProvider from '@/components/providers/ToastProvider';
export const metadata: Metadata = {
  title: 'Edu Platform',
  description: 'School Management System',
  keywords: ['school', 'management', 'education', 'admin', 'students'],
};
import { AuthProvider } from '@/components/providers/auth-provider';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AuthProvider>
            <ToastProvider />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
