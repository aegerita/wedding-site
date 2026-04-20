'use client';

import {
  CalendarDays,
  CircleHelp,
  ClipboardList,
  Flashlight,
  FlashlightOff,
  House,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { content } from '@/content/site';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: House,
  },
  {
    href: content.schedule.link.url,
    label: 'Schedule',
    icon: CalendarDays,
  },
  {
    href: '/rsvp',
    label: 'RSVP',
    icon: ClipboardList,
  },
  {
    href: '/faq',
    label: 'FAQ',
    icon: CircleHelp,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    document.documentElement.classList.toggle('dark', nextIsDark);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains('dark');

    document.documentElement.classList.toggle('dark', nextIsDark);
    window.localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
  };

  return (
    <nav
      aria-label='Primary'
      className='fixed bottom-6 left-1/2 z-50 -translate-x-1/2 sm:bottom-auto sm:left-6 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2'
    >
      <div className='flex items-center gap-2 rounded-full border border-border/70 bg-background/85 p-2 shadow-[0_18px_45px_-22px_rgba(41,37,36,0.45)] backdrop-blur md:flex-col md:gap-4 md:py-4'>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              title={label}
              className={`group relative flex h-11 w-11 items-center justify-center rounded-full border transition ${
                isActive
                  ? 'border-sidebar-primary bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                  : 'border-transparent bg-muted/80 text-muted-foreground hover:border-border hover:bg-background hover:text-foreground'
              }`}
            >
              <Icon className='h-5 w-5' strokeWidth={2} />
              <span className='sr-only'>{label}</span>
            </Link>
          );
        })}
        <Button
          aria-label='Toggle theme'
          onClick={toggleTheme}
          className='group relative flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-muted/80 text-muted-foreground transition hover:border-border hover:bg-background hover:text-foreground'
        >
          <FlashlightOff className='h-5 w-5 dark:hidden' strokeWidth={2} />
          <Flashlight className='hidden h-5 w-5 dark:block' strokeWidth={2} />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
}
