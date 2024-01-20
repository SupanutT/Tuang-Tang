import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import NextAuthProvider from '@/providers/NextAuthProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tuang Tang',
  description: 'Manage expenses in one app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <title> Tuang Tang</title>

      <body className={inter.className}>
        <NextAuthProvider session={session}>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
