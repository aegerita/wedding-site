import { SidebarNav } from '@/components/site/sidebar';
import { siteContent } from '@/content/site';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = siteContent.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        <SidebarNav />
        {children}
      </body>
    </html>
  );
}
