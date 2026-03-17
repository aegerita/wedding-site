'use client';

import { CalendarDays, ClipboardList, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: House,
  },
  {
    href: '/rsvp',
    label: 'RSVP',
    icon: ClipboardList,
  },
  {
    href: '/schedule',
    label: 'Schedule',
    icon: CalendarDays,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label='Primary'
      className='fixed bottom-6 left-1/2 z-50 -translate-x-1/2 sm:bottom-auto sm:left-6 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2'
    >
      <div className='flex items-center gap-2 rounded-full border border-white/70 bg-white/85 p-2 shadow-[0_18px_45px_-22px_rgba(41,37,36,0.45)] backdrop-blur md:flex-col md:gap-4 md:py-4'>
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
                  ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-sm'
                  : 'border-transparent bg-stone-100/80 text-stone-500 hover:border-stone-200 hover:bg-white hover:text-stone-900'
              }`}
            >
              <Icon className='h-5 w-5' strokeWidth={2} />
              <span className='sr-only'>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
