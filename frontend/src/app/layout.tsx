import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tuang Tang',
  description: 'Simplifying Bill Splitiing with Ease',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <title>Tuang Tang</title>

      <body className={inter.className}>

          {children}
      </body>
    </html>
  );
}
