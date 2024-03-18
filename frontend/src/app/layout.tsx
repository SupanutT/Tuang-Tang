import type { Metadata } from 'next';
import { Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/redux/ReduxProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import NextAuthProvider from '@/providers/NextAuthProvider';


const inter = Inter({ subsets: ['latin'] });
const openSans = Open_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Tuang Tang',
  description: 'Simplifying Bill Splitiing with Ease',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <title>Tuang Tang</title>

      <body className={openSans.className}>
        <ReduxProvider>
          <NextAuthProvider session={session}>
            {children}

          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
