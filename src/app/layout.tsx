import { SidebarNav } from '@/components/site/sidebar';
import { content } from '@/content/site';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = content.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='relative min-h-screen bg-background antialiased'>
        <div aria-hidden='true' className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
          <div className='absolute left-[-5rem] top-8 h-64 w-64 rounded-full bg-sky-300/25 blur-3xl' />
          <div className='absolute right-[-4rem] top-40 h-80 w-80 rounded-full bg-orange-200/25 blur-3xl' />
          <div className='absolute left-[12rem] top-180 h-120 w-120 rounded-full bg-orange-200/25 blur-3xl' />
        </div>
        <SidebarNav />
        <div className='relative z-10'>{children}</div>
      </body>
    </html>
  );
}
