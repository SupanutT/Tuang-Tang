import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import './globals.css';
import ReduxProvider from '@/redux/ReduxProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import NextAuthProvider from '@/providers/NextAuthProvider';
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const inter = Inter({ subsets: ['latin'] });
const ibmPlexSansThaiLooped = IBM_Plex_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["thai"],
  variable: "--ibm-plex-sans-thai-font",
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

      <body className={cn(
        inter.className,
        ibmPlexSansThaiLooped.className,
      )}>
        <ReduxProvider>
          <NextAuthProvider session={session}>
            {children}

          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
